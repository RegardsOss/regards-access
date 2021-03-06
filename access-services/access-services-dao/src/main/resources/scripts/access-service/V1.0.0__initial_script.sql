create table t_link_uiservice_dataset (linkId int8 not null, dataset_id varchar(256), primary key (linkId));
create table t_ui_plugin (id int8 not null, icon_url varchar(255), name varchar(32) not null, sourcePath varchar(255) not null, type varchar(255) not null, primary key (id));
create table t_ui_plugin_application_mode (ui_plugin_id int8 not null, application_mode varchar(255) not null, primary key (ui_plugin_id, application_mode));
create table t_ui_plugin_configuration (id int8 not null, active boolean not null, conf text not null, label varchar(32) not null, linkedToAllEntities boolean not null, ui_plugin_id int8, primary key (id));
create table t_ui_plugin_entity_type (ui_plugin_id int8 not null, entity_type varchar(255) not null, primary key (ui_plugin_id, entity_type));
create table ta_link_dataset_uiservices (dataset_id int8 not null, service_configuration_id int8 not null);
alter table t_link_uiservice_dataset add constraint uk_link_uiservice_dataset_dataset_id unique (dataset_id);
create sequence seq_ihm_plugin_configuration start 1 increment 50;
create sequence seq_ihm_uiplugin_dataset start 1 increment 50;
create sequence seq_ui_plugin start 1 increment 50;
alter table t_ui_plugin_application_mode add constraint fk_ui_plugin_application_mode_ui_plugin_id foreign key (ui_plugin_id) references t_ui_plugin;
alter table t_ui_plugin_configuration add constraint fk_ui_plugin_configuration_ui_plugin_id foreign key (ui_plugin_id) references t_ui_plugin;
alter table t_ui_plugin_entity_type add constraint fk_ui_plugin_entity_type_ui_plugin_id foreign key (ui_plugin_id) references t_ui_plugin;
alter table ta_link_dataset_uiservices add constraint fk_link_dataset_uiservices_service_configuration_id_dataset_id foreign key (service_configuration_id) references t_ui_plugin_configuration;
alter table ta_link_dataset_uiservices add constraint fk_link_dataset_uiservices_dataset_id_service_configuration_id foreign key (dataset_id) references t_link_uiservice_dataset;
