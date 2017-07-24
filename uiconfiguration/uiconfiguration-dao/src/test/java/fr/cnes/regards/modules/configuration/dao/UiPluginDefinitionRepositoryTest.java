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
package fr.cnes.regards.modules.configuration.dao;

import java.net.MalformedURLException;
import java.net.URL;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.google.common.collect.Sets;

import fr.cnes.regards.framework.jpa.multitenant.test.AbstractDaoTransactionalTest;
import fr.cnes.regards.modules.configuration.domain.UIPluginDefinition;
import fr.cnes.regards.modules.configuration.domain.UIPluginTypesEnum;
import fr.cnes.regards.modules.models.domain.EntityType;
import fr.cnes.regards.modules.search.domain.ServiceScope;

/**
 * Unit test for {@link IUIPluginDefinitionRepository}
 *
 * @author Xavier-Alexandre Brochard
 */
public class UiPluginDefinitionRepositoryTest extends AbstractDaoTransactionalTest {

    @Autowired
    private IUIPluginDefinitionRepository repository;

    @Test
    public void save() throws MalformedURLException {
        UIPluginDefinition uiPluginDefinition = new UIPluginDefinition();
        uiPluginDefinition.setId(0L);
        uiPluginDefinition.setIconUrl(new URL("http://wwww.google.com"));
        uiPluginDefinition.setName("My Cool Plugin");
        uiPluginDefinition.setSourcePath("the/source/path");
        uiPluginDefinition.setType(UIPluginTypesEnum.SERVICE);
        uiPluginDefinition.setEntityTypes(Sets.newHashSet(EntityType.COLLECTION, EntityType.DATA));
        uiPluginDefinition.setApplicationModes(Sets.newHashSet(ServiceScope.ONE, ServiceScope.MANY));
        repository.save(uiPluginDefinition);
    }

}
