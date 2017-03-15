/*
 * LICENSE_PLACEHOLDER
 */
package fr.cnes.regards.modules.configuration.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "T_IHM_MODULES")
public class Module {

    /**
     * Unique id
     */
    @Id
    @SequenceGenerator(name = "ihmModulesSequence", initialValue = 1, sequenceName = "SEQ_IHM_MODULES")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ihmModulesSequence")
    private Long id;

    /**
     * Module name. Use to instantiate the right module
     */
    @NotNull
    @Column(nullable = false, unique = true)
    private String name;

    /**
     * Module description label.
     */
    @NotNull
    @Column(nullable = false, unique = true)
    private String description;

    /**
     * The application where the module must be displayed
     */
    @NotNull
    @Column(nullable = false, unique = true)
    private String applicationId;

    /**
     * The container of the application layout where the module must be displayed
     */
    @NotNull
    @Column(nullable = false, unique = true)
    private String container;

    /**
     * Module configuration (JSON Object)
     */
    @Column(nullable = false, unique = true)
    @Type(type = "text")
    private String conf;

    /**
     * Does the module is active ?
     */
    @NotNull
    @Column(nullable = false, unique = true)
    private boolean active;

    public Long getId() {
        return id;
    }

    public void setId(final Long pId) {
        id = pId;
    }

    public String getName() {
        return name;
    }

    public void setName(final String pName) {
        name = pName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String pDescription) {
        description = pDescription;
    }

    public String getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(final String pApplicationId) {
        applicationId = pApplicationId;
    }

    public String getContainer() {
        return container;
    }

    public void setContainer(final String pContainer) {
        container = pContainer;
    }

    public String getConf() {
        return conf;
    }

    public void setConf(final String pConf) {
        conf = pConf;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(final boolean pActive) {
        active = pActive;
    }

}
