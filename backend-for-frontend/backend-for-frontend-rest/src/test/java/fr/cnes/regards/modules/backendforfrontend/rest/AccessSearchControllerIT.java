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
package fr.cnes.regards.modules.backendforfrontend.rest;

import java.util.ArrayList;
import java.util.List;

import org.hamcrest.Matchers;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import fr.cnes.regards.framework.jpa.multitenant.transactional.MultitenantTransactional;
import fr.cnes.regards.framework.test.integration.AbstractRegardsTransactionalIT;
import fr.cnes.regards.framework.test.integration.RequestParamBuilder;
import fr.cnes.regards.framework.test.report.annotation.Purpose;
import fr.cnes.regards.framework.test.report.annotation.Requirement;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Integration Test for {@link AccessSearchController}
 *
 * @author Xavier-Alexandre Brochard
 */
@TestPropertySource(locations = { "classpath:test.properties" })
@MultitenantTransactional
public class AccessSearchControllerIT extends AbstractRegardsTransactionalIT {

    /**
     * Class logger
     */
    private static final Logger LOG = LoggerFactory.getLogger(AccessSearchControllerIT.class);

    @Test
    @Requirement("REGARDS_DSL_ACC_USE_700")
    @Purpose("Check the system can inject applicable services to the result of a search")
    public void searchAll() {
        // Define expectations
        final List<ResultMatcher> expectations = new ArrayList<>();
        expectations.add(status().isOk());
        expectations.add(MockMvcResultMatchers.jsonPath(JSON_PATH_ROOT + ".content[0].content.services",
                                                        Matchers.hasSize(2)));
        expectations.add(MockMvcResultMatchers
                .jsonPath(JSON_PATH_ROOT + ".content[0].content.services[0].content.label", Matchers.equalTo("conf0")));
        expectations
                .add(MockMvcResultMatchers.jsonPath(JSON_PATH_ROOT + ".content[0].content.services[1].content.label",
                                                    Matchers.equalTo("uiPluginConfiguration2")));
        expectations.add(MockMvcResultMatchers.jsonPath(JSON_PATH_ROOT + ".content[1].content.services",
                                                        Matchers.hasSize(1)));
        expectations.add(MockMvcResultMatchers
                .jsonPath(JSON_PATH_ROOT + ".content[1].content.services[0].content.label", Matchers.equalTo("conf1")));

        // Call
        RequestParamBuilder builder = RequestParamBuilder.build().param("q",
                                                                        BackendForFrontendTestUtils.OPENSEARCH_QUERY);
        performDefaultGet(AccessSearchController.ROOT_PATH + AccessSearchController.SEARCH, expectations,
                          "Error searching all entities", builder);
    }

    @Test
    @Requirement("REGARDS_DSL_ACC_USE_700")
    @Purpose("Check the system can inject applicable services to the result of a search")
    public void searchAllWithFacets() {
        // Define expectations
        final List<ResultMatcher> expectations = new ArrayList<>();
        expectations.add(status().isOk());
        expectations.add(MockMvcResultMatchers.jsonPath(JSON_PATH_ROOT + ".content[0].content.services",
                                                        Matchers.hasSize(2)));
        expectations.add(MockMvcResultMatchers
                .jsonPath(JSON_PATH_ROOT + ".content[0].content.services[0].content.label", Matchers.equalTo("conf0")));
        expectations
                .add(MockMvcResultMatchers.jsonPath(JSON_PATH_ROOT + ".content[0].content.services[1].content.label",
                                                    Matchers.equalTo("uiPluginConfiguration2")));
        expectations.add(MockMvcResultMatchers.jsonPath(JSON_PATH_ROOT + ".content[1].content.services",
                                                        Matchers.hasSize(1)));
        expectations.add(MockMvcResultMatchers
                .jsonPath(JSON_PATH_ROOT + ".content[1].content.services[0].content.label", Matchers.equalTo("conf1")));

        // Call
        RequestParamBuilder builder = RequestParamBuilder.build().param("q",
                                                                        BackendForFrontendTestUtils.OPENSEARCH_QUERY);
        performDefaultGet(AccessSearchController.ROOT_PATH + AccessSearchController.SEARCH_WITH_FACETS, expectations,
                          "Error searching all entities with facets", builder);
    }

    @Test
    @Requirement("REGARDS_DSL_ACC_USE_700")
    @Purpose("Check the system can inject applicable services to the result of a search")
    public void searchCollections() {
        // Define expectations
        final List<ResultMatcher> expectations = new ArrayList<>();
        expectations.add(status().isOk());
        expectations.add(MockMvcResultMatchers.jsonPath(JSON_PATH_ROOT + ".content[0].content.services",
                                                        Matchers.hasSize(1)));
        expectations.add(MockMvcResultMatchers
                .jsonPath(JSON_PATH_ROOT + ".content[0].content.services[0].content.label", Matchers.equalTo("conf1")));

        // Call
        RequestParamBuilder builder = RequestParamBuilder.build().param("q",
                                                                        BackendForFrontendTestUtils.OPENSEARCH_QUERY);
        performDefaultGet(AccessSearchController.ROOT_PATH + AccessSearchController.COLLECTIONS_SEARCH, expectations,
                          "Error searching collections", builder);
    }

    @Test
    @Requirement("REGARDS_DSL_ACC_USE_700")
    @Purpose("Check the system can inject applicable services to the result of a search")
    public void searchDatasets() {
        // Define expectations
        final List<ResultMatcher> expectations = new ArrayList<>();
        expectations.add(status().isOk());
        expectations.add(MockMvcResultMatchers.jsonPath(JSON_PATH_ROOT + ".content[0].content.services",
                                                        Matchers.hasSize(0)));
        expectations.add(MockMvcResultMatchers.jsonPath(JSON_PATH_ROOT + ".content[1].content.services",
                                                        Matchers.hasSize(2)));
        expectations.add(MockMvcResultMatchers
                .jsonPath(JSON_PATH_ROOT + ".content[1].content.services[0].content.label", Matchers.equalTo("conf0")));
        expectations
                .add(MockMvcResultMatchers.jsonPath(JSON_PATH_ROOT + ".content[1].content.services[1].content.label",
                                                    Matchers.equalTo("uiPluginConfiguration2")));

        // Call
        RequestParamBuilder builder = RequestParamBuilder.build().param("q",
                                                                        BackendForFrontendTestUtils.OPENSEARCH_QUERY);
        performDefaultGet(AccessSearchController.ROOT_PATH + AccessSearchController.DATASETS_SEARCH, expectations,
                          "Error searching datasets", builder);
    }

    @Test
    @Requirement("REGARDS_DSL_ACC_USE_700")
    @Purpose("Check the system can inject applicable services to the result of a search")
    public void searchDataobjects() {
        // Define expectations
        final List<ResultMatcher> expectations = new ArrayList<>();
        expectations.add(status().isOk());
        expectations.add(MockMvcResultMatchers.jsonPath(JSON_PATH_ROOT + ".content[0].content.services",
                                                        Matchers.hasSize(2)));
        expectations.add(MockMvcResultMatchers
                .jsonPath(JSON_PATH_ROOT + ".content[0].content.services[0].content.label", Matchers.equalTo("conf0")));
        expectations
                .add(MockMvcResultMatchers.jsonPath(JSON_PATH_ROOT + ".content[0].content.services[1].content.label",
                                                    Matchers.equalTo("uiPluginConfiguration2")));

        // Call
        RequestParamBuilder builder = RequestParamBuilder.build().param("q",
                                                                        BackendForFrontendTestUtils.OPENSEARCH_QUERY);
        performDefaultGet(AccessSearchController.ROOT_PATH + AccessSearchController.DATAOBJECTS_SEARCH, expectations,
                          "Error searching datasets", builder);
    }

    @Test
    @Requirement("REGARDS_DSL_ACC_USE_700")
    @Purpose("Check the system can inject applicable services to the result of a search")
    public void searchDocuments() {
        // Define expectations
        final List<ResultMatcher> expectations = new ArrayList<>();
        expectations.add(status().isOk());
        expectations.add(MockMvcResultMatchers.jsonPath(JSON_PATH_ROOT + ".content[0].content.services",
                                                        Matchers.hasSize(3)));
        expectations.add(MockMvcResultMatchers
                .jsonPath(JSON_PATH_ROOT + ".content[0].content.services[*].content.label",
                          Matchers.containsInAnyOrder("conf0", "conf1", "uiPluginConfiguration2")));

        // Call
        RequestParamBuilder builder = RequestParamBuilder.build().param("q",
                                                                        BackendForFrontendTestUtils.OPENSEARCH_QUERY);
        performDefaultGet(AccessSearchController.ROOT_PATH + AccessSearchController.DOCUMENTS_SEARCH, expectations,
                          "Error searching datasets", builder);
    }

    @Test
    @Requirement("REGARDS_DSL_ACC_USE_700")
    @Purpose("Check the system can inject applicable services to the result of a search")
    public void searchDataobjectsReturnDatasets() {
        // Define expectations
        final List<ResultMatcher> expectations = new ArrayList<>();
        expectations.add(status().isOk());
        expectations.add(MockMvcResultMatchers.jsonPath(JSON_PATH_ROOT + ".content[0].content.services",
                                                        Matchers.hasSize(0)));
        expectations.add(MockMvcResultMatchers.jsonPath(JSON_PATH_ROOT + ".content[1].content.services",
                                                        Matchers.hasSize(2)));
        expectations.add(MockMvcResultMatchers
                .jsonPath(JSON_PATH_ROOT + ".content[1].content.services[0].content.label", Matchers.equalTo("conf0")));
        expectations
                .add(MockMvcResultMatchers.jsonPath(JSON_PATH_ROOT + ".content[1].content.services[1].content.label",
                                                    Matchers.equalTo("uiPluginConfiguration2")));

        // Call
        RequestParamBuilder builder = RequestParamBuilder.build().param("q",
                                                                        BackendForFrontendTestUtils.OPENSEARCH_QUERY);
        performDefaultGet(AccessSearchController.ROOT_PATH + AccessSearchController.DATAOBJECTS_DATASETS_SEARCH, expectations,
                          "Error searching datasets", builder);
    }

    @Override
    protected Logger getLogger() {
        return LOG;
    }
}