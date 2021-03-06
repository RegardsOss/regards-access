create table t_ui_configuration (id int8 not null, application_id varchar(16) not null, configuration text not null, primary key (id));
create table t_ui_layout (id int8 not null, application_id varchar(16) not null, layout text not null, primary key (id));
create table t_ui_module (id int8 not null, active boolean not null, applicationId varchar(16) not null, conf text not null, container varchar(255) not null, description varchar(64) not null, customIconURL varchar(512), home boolean, iconType varchar(128), title text, type varchar(32) not null, primary key (id));
create table t_ui_theme (id int8 not null, active boolean not null, configuration text not null, name varchar(16) not null, primary key (id));
alter table t_ui_configuration add constraint uk_ui_configuration_application_id unique (application_id);
alter table t_ui_layout add constraint uk_ui_layout_application_id unique (application_id);
alter table t_ui_theme add constraint uk_ui_theme_name unique (name);
create sequence seq_ui_configuration start 1 increment 50;
create sequence seq_ui_layout start 1 increment 50;
create sequence seq_ui_module start 1 increment 50;
create sequence seq_ui_theme start 1 increment 50;
