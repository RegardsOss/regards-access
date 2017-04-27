/*
 * LICENSE_PLACEHOLDER
 */
package fr.cnes.regards.modules.configuration.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import fr.cnes.regards.framework.module.rest.exception.EntityException;
import fr.cnes.regards.framework.module.rest.exception.EntityInvalidException;
import fr.cnes.regards.framework.module.rest.exception.EntityNotFoundException;
import fr.cnes.regards.modules.configuration.dao.IUIPluginConfigurationRepository;
import fr.cnes.regards.modules.configuration.dao.IUIPluginDefinitionRepository;
import fr.cnes.regards.modules.configuration.domain.UIPluginConfiguration;
import fr.cnes.regards.modules.configuration.domain.UIPluginDefinition;

/**
 *
 * Class PluginConfigurationService
 *
 * Business service to manage {@link UIPluginConfiguration} entities.
 *
 * @author Sébastien Binda
 * @since 1.0-SNAPSHOT
 */
@Service(value = "pluginConfigurationService")
public class UIPluginConfigurationService implements IUIPluginConfigurationService {

    @Autowired
    private IUIPluginDefinitionRepository pluginRepository;

    @Autowired
    private IUIPluginConfigurationRepository repository;

    @Override
    public Page<UIPluginConfiguration> retrievePluginConfigurations(final Boolean pIsActive,
            final Boolean pIsLinkedToAllEntities, final Pageable pPageable) {
        if ((pIsActive != null) && (pIsLinkedToAllEntities != null)) {
            return repository.findByActiveAndLinkedToAllEntities(pIsActive, pIsLinkedToAllEntities, pPageable);
        } else
            if (pIsActive != null) {
                return repository.findByActive(pIsActive, pPageable);
            } else
                if (pIsLinkedToAllEntities != null) {
                    return repository.findByLinkedToAllEntities(pIsLinkedToAllEntities, pPageable);
                } else {
                    return repository.findAll(pPageable);
                }
    }

    @Override
    public Page<UIPluginConfiguration> retrievePluginConfigurations(final UIPluginDefinition pPluginDefinition,
            final Boolean pIsActive, final Boolean pIsLinkedToAllEntities, final Pageable pPageable)
            throws EntityException {
        if ((pPluginDefinition == null) || (pPluginDefinition.getId() == null)) {
            throw new EntityInvalidException("Plugin Identifier cannot be null");
        }

        // retrieve plugin
        if (!pluginRepository.exists(pPluginDefinition.getId())) {
            throw new EntityNotFoundException(pPluginDefinition.getId(), UIPluginDefinition.class);
        }
        return repository.findByPluginDefinition(pPluginDefinition, pPageable);
    }

    @Override
    public UIPluginConfiguration retrievePluginconfiguration(final Long pPluginConfigurationId)
            throws EntityInvalidException {
        if (pPluginConfigurationId == null) {
            throw new EntityInvalidException("Plugin Identifier cannot be null");
        }

        return repository.findOne(pPluginConfigurationId);
    }

    @Override
    public UIPluginConfiguration updatePluginconfiguration(final UIPluginConfiguration pPluginConfiguration)
            throws EntityException {
        if ((pPluginConfiguration == null) || (pPluginConfiguration.getId() == null)) {
            throw new EntityInvalidException("PluginConfiguration Identifier cannot be null");
        }

        if (!repository.exists(pPluginConfiguration.getId())) {
            throw new EntityNotFoundException(pPluginConfiguration.getId(), UIPluginConfiguration.class);
        }

        // Check configuration json format
        final Gson gson = new Gson();
        try {
            gson.fromJson(pPluginConfiguration.getConf(), Object.class);
        } catch (final Exception e) {
            throw new EntityInvalidException("Configuration is not a valid json format.");
        }

        return repository.save(pPluginConfiguration);
    }

    @Override
    public UIPluginConfiguration createPluginconfiguration(final UIPluginConfiguration pPluginConfiguration)
            throws EntityException {
        if ((pPluginConfiguration == null) || (pPluginConfiguration.getId() != null)) {
            throw new EntityInvalidException("PluginConfiguration is invalid");
        }

        // Check configuration json format
        final Gson gson = new Gson();
        try {
            gson.fromJson(pPluginConfiguration.getConf(), Object.class);
        } catch (final Exception e) {
            throw new EntityInvalidException("Configuration is not a valid json format.");
        }

        return repository.save(pPluginConfiguration);
    }

    @Override
    public void deletePluginconfiguration(final UIPluginConfiguration pPluginConfiguration) throws EntityException {
        if ((pPluginConfiguration == null) || (pPluginConfiguration.getId() == null)) {
            throw new EntityInvalidException("PluginConfiguration Identifier cannot be null");
        }

        if (!repository.exists(pPluginConfiguration.getId())) {
            throw new EntityNotFoundException(pPluginConfiguration.getId(), UIPluginConfiguration.class);
        }
        repository.delete(pPluginConfiguration);

    }

}