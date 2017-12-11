/*
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
package fr.cnes.regards.modules.access.services.client;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import fr.cnes.regards.framework.amqp.ISubscriber;
import fr.cnes.regards.framework.amqp.domain.IHandler;
import fr.cnes.regards.framework.amqp.domain.TenantWrapper;
import fr.cnes.regards.framework.multitenant.IRuntimeTenantResolver;
import fr.cnes.regards.modules.access.services.domain.event.LinkUiPluginsDatasetsEvent;
import fr.cnes.regards.modules.access.services.domain.event.UIPluginConfigurationEvent;
import fr.cnes.regards.modules.catalog.services.domain.event.LinkPluginsDatasetsEvent;

/**
 * Module-common handler for AMQP events.
 *
 * @author Xavier-Alexandre Brochard
 */
@Component
public class ServiceAggregatorClientEventHandler implements ApplicationListener<ApplicationReadyEvent> {

    private final ISubscriber subscriber;

    private final IRuntimeTenantResolver runtimeTenantResolver;

    private final IServiceAggregatorClient serviceAggregatorClient;

    /**
     * @param pSubscriber
     * @param pRuntimeTenantResolver
     * @param pServiceAggregatorClient
     */
    public ServiceAggregatorClientEventHandler(ISubscriber pSubscriber, IRuntimeTenantResolver pRuntimeTenantResolver,
            IServiceAggregatorClient pServiceAggregatorClient) {
        super();
        subscriber = pSubscriber;
        runtimeTenantResolver = pRuntimeTenantResolver;
        serviceAggregatorClient = pServiceAggregatorClient;
    }

    @Override
    public void onApplicationEvent(ApplicationReadyEvent pEvent) {
        subscriber.subscribeTo(LinkUiPluginsDatasetsEvent.class, new LinkUiPluginsDatasetsEventHandler());
        subscriber.subscribeTo(LinkPluginsDatasetsEvent.class, new LinkPluginsDatasetsEventHandler());
        subscriber.subscribeTo(UIPluginConfigurationEvent.class, new UIPluginConfigurationEventHandler());
    }

    /**
     * Handle {@link LinkUiPluginsDatasetsEvent} event to clear "servicesAggregated" cache
     *
     * @author Xavier-Alexandre Brochard
     */
    private class LinkUiPluginsDatasetsEventHandler implements IHandler<LinkUiPluginsDatasetsEvent> {

        @Override
        public void handle(TenantWrapper<LinkUiPluginsDatasetsEvent> wrapper) {
            try {
                runtimeTenantResolver.forceTenant(wrapper.getTenant());
                serviceAggregatorClient.clearServicesAggregatedCache();
            } finally {
                runtimeTenantResolver.clearTenant();
            }
        }
    }

    /**
     * Handle {@link LinkPluginsDatasetsEvent} event to clear "servicesAggregated" cache
     *
     * @author Xavier-Alexandre Brochard
     */
    private class LinkPluginsDatasetsEventHandler implements IHandler<LinkPluginsDatasetsEvent> {

        @Override
        public void handle(TenantWrapper<LinkPluginsDatasetsEvent> wrapper) {
            try {
                runtimeTenantResolver.forceTenant(wrapper.getTenant());
                serviceAggregatorClient.clearServicesAggregatedCache();
            } finally {
                runtimeTenantResolver.clearTenant();
            }
        }
    }

    /**
     * Handle {@link UIPluginConfigurationEvent} event to clear "servicesAggregated" cache.
     * We maybe could optimize and change cache content instead of clearing...
     *
     * @author Xavier-Alexandre Brochard
     */
    private class UIPluginConfigurationEventHandler implements IHandler<UIPluginConfigurationEvent> {

        @Override
        public void handle(TenantWrapper<UIPluginConfigurationEvent> wrapper) {
            try {
                runtimeTenantResolver.forceTenant(wrapper.getTenant());
                serviceAggregatorClient.clearServicesAggregatedCache();
            } finally {
                runtimeTenantResolver.clearTenant();
            }
        }
    }

}