/*
 * LICENSE_PLACEHOLDER
 */
package fr.cnes.regards.modules.configuration.dao;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import fr.cnes.regards.framework.jpa.multitenant.test.AbstractDaoTransactionalTest;
import fr.cnes.regards.modules.configuration.domain.Module;

/**
 *
 * Class LayoutRepositoryTest
 *
 * DAO Test
 *
 * @author Sébastien Binda
 * @since 1.0-SNAPSHOT
 */
public class ModuleRepositoryTest extends AbstractDaoTransactionalTest {

    @Autowired
    private IModuleRepository repository;

    /**
     *
     * Common method to save a new module
     *
     * @param pApplicationId
     * @return
     * @since 1.0-SNAPSHOT
     */
    private Module addModule(final String pApplicationId) {
        // Create a new layout configuration
        final Module module = new Module();
        module.setApplicationId(pApplicationId);
        module.setActive(true);
        module.setConf("{}");
        module.setContainer("TestContainer");
        module.setDescription("Test module");
        module.setType("module");
        return repository.save(module);
    }

    /**
     *
     * Test saving a new module configuration
     *
     * @since 1.0-SNAPSHOT
     */
    @Test
    public void saveModuleTest() {
        // Create a new layout configuration
        final Module module = addModule("TEST");
        final Module newModule = repository.save(module);
        final Module module2 = repository.findOne(newModule.getId());
        Assert.assertEquals(newModule.getApplicationId(), module2.getApplicationId());
    }

    /**
     *
     * Test updating an existing module.
     *
     * @since 1.0-SNAPSHOT
     */
    @Test
    public void updateModuleTest() {
        final Module module = addModule("TEST");
        module.setDescription("New description");
        final Module module2 = repository.save(module);
        Assert.assertEquals("New description", module2.getDescription());
    }

    /**
     * Test finding modules.
     *
     * @since 1.0-SNAPSHOT
     */
    @Test
    public void findModulesTest() {
        addModule("TEST");
        addModule("TEST");
        addModule("OTHER_TEST");
        Page<Module> modulesPage = repository.findByApplicationId("TEST", new PageRequest(0, 10));
        Assert.assertEquals(2, modulesPage.getTotalElements());

        modulesPage = repository.findByApplicationId("OTHER_TEST", new PageRequest(0, 10));
        Assert.assertEquals(1, modulesPage.getTotalElements());
    }

    /**
     *
     * Test deleting a module.
     *
     * @since 1.0-SNAPSHOT
     */
    @Test
    public void deleteLayoutTest() {
        // Create a new layout configuration
        final Module module = addModule("TEST");
        repository.delete(module);
    }

}
