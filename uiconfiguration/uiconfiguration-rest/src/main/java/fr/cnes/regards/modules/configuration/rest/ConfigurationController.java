package fr.cnes.regards.modules.configuration.rest;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import fr.cnes.regards.framework.hateoas.IResourceController;
import fr.cnes.regards.framework.hateoas.IResourceService;
import fr.cnes.regards.framework.hateoas.LinkRels;
import fr.cnes.regards.framework.hateoas.MethodParamFactory;
import fr.cnes.regards.framework.module.rest.exception.EntityNotFoundException;
import fr.cnes.regards.framework.security.annotation.ResourceAccess;
import fr.cnes.regards.framework.security.role.DefaultRole;
import fr.cnes.regards.modules.configuration.domain.Configuration;
import fr.cnes.regards.modules.configuration.service.IConfigurationService;

/**
 * REST controller for the microservice Access
 *
 * @author Kevin Marchois
 *
 */
@RestController
@RequestMapping("/configuration")
public class ConfigurationController implements IResourceController<String> {

	@Autowired
	private IConfigurationService configurationService;
	
	@Autowired
    private IResourceService resourceService;
	
	/**
     * Entry point to retrieve a {@link Configuration}
     * @param applicationId
     *
     * @return {@link Configuration}
     */
    @RequestMapping(value = "/{applicationId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @ResourceAccess(description = "Endpoint to retrieve Configuration for the given applicationId",
            role = DefaultRole.PUBLIC)
    public HttpEntity<Resource<String>> retrieveConfiguration(@PathVariable("applicationId") final String applicationId) {
        String conf;
		try {
			conf = configurationService.retrieveConfiguration(applicationId);
	        final Resource<String> resource = toResource(conf, new Object[]{applicationId});
	        return new ResponseEntity<>(resource, HttpStatus.OK);
		} catch (EntityNotFoundException e) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}

    }
    
    /**
     * Entry point to add a {@link Configuration}
     * @param applicationId
     *
     * @return {@link Configuration}
     */
    @RequestMapping(value = "/{applicationId}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @ResourceAccess(description = "Endpoint to add a Configuration",
            role = DefaultRole.ADMIN)
    public HttpEntity<Resource<String>> addConfiguration(@PathVariable("applicationId") final String applicationId, 
    		@Valid @RequestBody String toAdd) {
        final String conf = configurationService.addConfiguration(toAdd, applicationId);
        final Resource<String> resource = toResource(conf, new Object[]{applicationId});
        return new ResponseEntity<>(resource, HttpStatus.OK);
    }
    
    /**
     * Entry point to update a {@link Configuration}
     * @param applicationId
     *
     * @return {@link Configuration}
     */
    @RequestMapping(value = "/{applicationId}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @ResourceAccess(description = "Endpoint to update a Configuration",
            role = DefaultRole.ADMIN)
    public HttpEntity<Resource<String>> updateConfiguration(@PathVariable("applicationId") final String applicationId, 
    		@Valid @RequestBody String toAdd) {
        String conf;
		try {
			conf = configurationService.updateConfiguration(toAdd, applicationId);
	        final Resource<String> resource = toResource(conf, new Object[]{applicationId});
	        return new ResponseEntity<>(resource, HttpStatus.OK);
		} catch (EntityNotFoundException e) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}

    }
    
	@Override
    public Resource<String> toResource(final String element, final Object... extras) {
        final Resource<String> resource = resourceService.toResource(element);
        resourceService.addLink(resource, this.getClass(), "retrieveConfiguration", LinkRels.SELF,
                                MethodParamFactory.build(String.class, String.valueOf(extras[0])));
        resourceService.addLink(resource, this.getClass(), "addConfiguration", LinkRels.CREATE,
                MethodParamFactory.build(String.class, String.valueOf(extras[0])),
                MethodParamFactory.build(Configuration.class));
        resourceService.addLink(resource, this.getClass(), "updateConfiguration", LinkRels.UPDATE,
                                MethodParamFactory.build(String.class, String.valueOf(extras[0])),
                                		MethodParamFactory.build(Configuration.class));
        return resource;
    }

}