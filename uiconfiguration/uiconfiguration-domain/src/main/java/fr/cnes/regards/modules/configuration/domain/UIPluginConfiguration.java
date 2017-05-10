/*
 * LICENSE_PLACEHOLDER
 */
package fr.cnes.regards.modules.configuration.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Type;

/**
 *
 * Class PluginConfiguration
 *
 * Entity to describe an IHM Plugin configuration.
 *
 * @author Sébastien Binda
 * @since 1.0-SNAPSHOT
 */
@Entity
@Table(name = "T_IHM_PLUGIN_CONFIGURATIONS")
public class UIPluginConfiguration {

    /**
     * Unique id
     */
    @Id
    @SequenceGenerator(name = "ihmPluginConfsSequence", initialValue = 1,
            sequenceName = "SEQ_IHM_PLUGIN_CONFIGURATIONS")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ihmPluginConfsSequence")
    private Long id;

    @NotNull
    @ManyToOne
    private UIPluginDefinition pluginDefinition;

    @NotNull
    @Column(nullable = false)
    private Boolean active;

    @NotNull
    @Column(nullable = false, length = 32)
    private String label;

    /**
     * Parameter to define if by default this plugin configuration is linked to all entities.
     */
    @NotNull
    @Column(nullable = false)
    private Boolean linkedToAllEntities;

    /**
     * Plugin configuration (JSON Object)
     */
    @Column(nullable = false)
    @Type(type = "text")
    private String conf;

    public Long getId() {
        return id;
    }

    public void setId(final Long pId) {
        id = pId;
    }

    public UIPluginDefinition getPluginDefinition() {
        return pluginDefinition;
    }

    public void setPluginDefinition(final UIPluginDefinition pPluginDefinition) {
        pluginDefinition = pPluginDefinition;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(final Boolean pActive) {
        active = pActive;
    }

    public Boolean getLinkedToAllEntities() {
        return linkedToAllEntities;
    }

    public void setLinkedToAllEntities(final Boolean pLinkedToAllEntities) {
        linkedToAllEntities = pLinkedToAllEntities;
    }

    public String getConf() {
        return conf;
    }

    public void setConf(final String pConf) {
        conf = pConf;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(final String pLabel) {
        label = pLabel;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = (prime * result) + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final UIPluginConfiguration other = (UIPluginConfiguration) obj;
        if (id == null) {
            if (other.id != null) {
                return false;
            }
        } else
            if (!id.equals(other.id)) {
                return false;
            }
        return true;
    }

    @Override
    public String toString() {
        return "UIPluginConfiguration [id=" + id + ", pluginDefinition=" + pluginDefinition + ", active=" + active
                + ", label=" + label + ", linkedToAllEntities=" + linkedToAllEntities + ", conf=" + conf + "]";
    }

}
