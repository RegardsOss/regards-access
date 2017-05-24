/*
 * LICENSE_PLACEHOLDER
 */
package fr.cnes.regards.modules.configuration.rest;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.ResultMatcher;

import fr.cnes.regards.framework.jpa.multitenant.transactional.MultitenantTransactional;
import fr.cnes.regards.framework.test.integration.AbstractRegardsTransactionalIT;
import fr.cnes.regards.framework.test.report.annotation.Purpose;
import fr.cnes.regards.framework.test.report.annotation.Requirement;
import fr.cnes.regards.modules.configuration.dao.ILinkUIPluginsDatasetsRepository;
import fr.cnes.regards.modules.configuration.dao.IUIPluginConfigurationRepository;
import fr.cnes.regards.modules.configuration.dao.IUIPluginDefinitionRepository;
import fr.cnes.regards.modules.configuration.domain.LinkUIPluginsDatasets;
import fr.cnes.regards.modules.configuration.domain.UIPluginConfiguration;
import fr.cnes.regards.modules.configuration.domain.UIPluginDefinition;
import fr.cnes.regards.modules.configuration.domain.UIPluginTypesEnum;

/**
 *
 * Class LinkUIPluginDatasetsIT
 *
 * @author Sébastien Binda
 * @since 1.0-SNAPSHOT
 */
@TestPropertySource(locations = { "classpath:test.properties" })
@MultitenantTransactional
public class LinkUIPluginDatasetsIT extends AbstractRegardsTransactionalIT {

    /**
     * Class logger
     */
    private static final Logger LOG = LoggerFactory.getLogger(UIPluginServiceControllerIT.class);

    @Autowired
    private IUIPluginDefinitionRepository pluginDefRepository;

    @Autowired
    private ILinkUIPluginsDatasetsRepository linkRepo;

    @Autowired
    private IUIPluginConfigurationRepository repository;

    @Override
    protected Logger getLogger() {
        return LOG;
    }

    private UIPluginDefinition plugin;

    private UIPluginConfiguration pluginConf;

    private UIPluginConfiguration pluginConf2;

    private UIPluginDefinition createPlugin(final UIPluginTypesEnum pType) {
        final UIPluginDefinition plugin = new UIPluginDefinition();
        plugin.setName("PluginTest");
        plugin.setType(pType);
        plugin.setSourcePath("plugins/test/bundle.js");
        return plugin;
    }

    private UIPluginConfiguration createPluginConf(final UIPluginDefinition pPluginDef, final Boolean pIsActive,
            final Boolean pIsLinked) {
        final UIPluginConfiguration conf = new UIPluginConfiguration();
        conf.setActive(pIsActive);
        conf.setLinkedToAllEntities(pIsLinked);
        conf.setPluginDefinition(pPluginDef);
        conf.setConf("{}");
        conf.setLabel("label");
        return conf;
    }

    @Before
    public void init() {

        // Create plugin definitions
        plugin = pluginDefRepository.save(createPlugin(UIPluginTypesEnum.CRITERIA));
        final UIPluginDefinition plugin2 = pluginDefRepository.save(createPlugin(UIPluginTypesEnum.SERVICE));

        // Create plugin Configurations
        pluginConf = repository.save(createPluginConf(plugin2, true, false));
        pluginConf2 = repository.save(createPluginConf(plugin2, true, false));
        repository.save(createPluginConf(plugin2, false, true));
        repository.save(createPluginConf(plugin2, false, false));
        // Add an active service plugin conf linked to all datasets
        repository.save(createPluginConf(plugin2, true, true));
        // Add an active plugin conf linked to all datasets but not a service type
        repository.save(createPluginConf(plugin, true, true));
        // Add an inactive service plugin conf linked to all datasets
        repository.save(createPluginConf(plugin2, false, true));
    }

    @Requirement("REGARDS_DSL_ACC_ADM_1530")
    @Purpose("Check association between UIPluginService and dataset")
    @Test
    public void linkConfToDataset() {

        // Create a new link between a given dataset and 2 plugin configurations
        final List<ResultMatcher> expectations = new ArrayList<>(1);
        final List<UIPluginConfiguration> services = new ArrayList<>();
        services.add(pluginConf);
        services.add(pluginConf2);
        LinkUIPluginsDatasets link = new LinkUIPluginsDatasets();
        link.setDatasetId("firstOne");
        link.setServices(services);

        expectations.add(status().isOk());
        performDefaultPut(LinkUIPluginsDatasetsController.REQUEST_MAPPING_ROOT, link, expectations,
                          "Error getting dataset linked UIPluginConfiguration", "firstOne");

        LinkUIPluginsDatasets linkResult = linkRepo.findOneByDatasetId("firstOne");
        Assert.assertNotEquals(null, linkResult);
        Assert.assertNotEquals(null, linkResult.getServices());
        Assert.assertEquals(2, linkResult.getServices().size());

        // Update existing link
        services.clear();
        services.add(pluginConf2);
        link = new LinkUIPluginsDatasets();
        link.setDatasetId("firstOne");
        link.setServices(services);
        expectations.add(status().isOk());
        performDefaultPut(LinkUIPluginsDatasetsController.REQUEST_MAPPING_ROOT, link, expectations,
                          "Error getting dataset linked UIPluginConfiguration", "firstOne");

        linkResult = linkRepo.findOneByDatasetId("firstOne");
        Assert.assertNotEquals(null, linkResult);
        Assert.assertNotEquals(null, linkResult.getServices());
        Assert.assertEquals(1, linkResult.getServices().size());

        // Remove all links
        services.clear();
        link = new LinkUIPluginsDatasets();
        link.setDatasetId("firstOne");
        link.setServices(services);
        expectations.add(status().isOk());
        performDefaultPut(LinkUIPluginsDatasetsController.REQUEST_MAPPING_ROOT, link, expectations,
                          "Error getting dataset linked UIPluginConfiguration", "firstOne");

        linkResult = linkRepo.findOneByDatasetId("firstOne");
        Assert.assertNotEquals(null, linkResult);
        Assert.assertNotEquals(null, linkResult.getServices());
        Assert.assertEquals(0, linkResult.getServices().size());

    }

}