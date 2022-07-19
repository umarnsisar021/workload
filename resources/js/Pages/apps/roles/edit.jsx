import React, { useState } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { Accordion, Card, Dropdown, ButtonGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';

import { useForm, Controller } from "react-hook-form";

const editRole = (props) => {

    const { register, getValues, setValue, control } = useForm();

    const { sub_title, title, id, name, description, modules } = props;
    console.log(modules);
    const { errors } = usePage().props
    const AllOptions = [];

    function selectAll(e) {
        const isChecked = e.target.checked;
        AllOptions.map((inputName, index) => {
            setValue(`${inputName}`, isChecked);
        })
    }

    function SelectAllChiled(e, moduleIndex) {

        let isChecked = e.target.checked;

        // check/uncheck parent module options
        modules[moduleIndex].options.map((module_option) => {
            let inputName = module_option.id + "-" + module_option.module_id;
            setValue(`${inputName}`, isChecked);
        });

        // check/uncheck child module options
        modules[moduleIndex].childs.map((module) => {
            module.options.map((option) => {
                let inputName = option.id + "-" + option.module_id;
                setValue(`${inputName}`, isChecked);
            });
        })
    }

    function selectMyParent(e, moduleIndex) {

        let isChecked = e.target.checked;
        if (isChecked) {
            let inputName = modules[moduleIndex].options[0].id + "-" + modules[moduleIndex].id;
            setValue(`${inputName}`, isChecked);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const values = getValues();
        Inertia.post(route('roles.update', id), values);
    }

    return (
        <Layout3 title={title}>
            <form method="post" onSubmit={handleSubmit}>
                <input
                    {...register("_method")}
                    type="hidden"
                    defaultValue={'PUT'}
                />
                <div className="row mb-4">
                    <div className="col-md-12 mb-4">
                        <div className="card text-left">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4 className="card-title">
                                            <InertiaLink href={route('roles.index')}>
                                                <span
                                                    className="font-weight-bold"
                                                    style={{ fontSize: "22px" }}
                                                >
                                                    {title}{" "}
                                                </span>
                                            </InertiaLink>
                                            / {sub_title}
                                        </h4>
                                    </div>
                                    <div className="col-md-4 text-right">
                                        <button
                                            type="submit"
                                            className="btn btn-primary ladda-button example-button"
                                            id="form-submit"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-md-6 form-group mb-3">
                                        <label htmlFor="name">Name</label>
                                        <input className="form-control" type="text" {...register("name")} defaultValue={name} />
                                        {errors.name && <span className="text-danger">{errors.name}</span>}
                                    </div>

                                    <div className="col-md-6 form-group mb-3">
                                        <label>Description</label>
                                        <textarea className="form-control" {...register("description")} defaultValue={description}></textarea>
                                        {errors.description && <span className="text-danger">{errors.description}</span>}
                                    </div>
                                    <div className="col-md-6 form-group mb-3">
                                        <label className="checkbox checkbox-primary">
                                            <input
                                                name="grantAll"
                                                type="checkbox"
                                                onChange={selectAll}
                                            />
                                            <span className="checkmark"></span>
                                            <span className="text-bold">Grant all permissions</span>
                                        </label>
                                    </div>

                                    {/*------------------------------------ New work ------------------------------ */}
                                    <div className="col-md-12 form-group mb-3">
                                        {modules.map((parent, ParentIndex) => (
                                            <Accordion defaultActiveKey={parent.id} key={ParentIndex}>
                                                <Card>
                                                    <Accordion.Toggle as={Card.Header} eventKey={parent.id} style={{ background: 'lavender' }}>
                                                        <i className={`nav-icon mr-2 ${parent.icon_class}`}></i>
                                                        <strong>{parent.name}</strong>
                                                        <div className="float-right">
                                                            <label className="checkbox checkbox-primary">
                                                                <span>Select All</span>
                                                                <input
                                                                    name={'selectAll-' + parent.id}
                                                                    type="checkbox"
                                                                    onChange={(e) => SelectAllChiled(e, ParentIndex)}
                                                                />
                                                                <span className="checkmark"></span>
                                                            </label>
                                                        </div>
                                                    </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey={parent.id}>
                                                        <Card.Body>
                                                            {parent.options.map((option, optionIndex) => {
                                                                AllOptions.push(option.id + '-' + parent.id);

                                                                return (
                                                                    <label className="switch pr-5 switch-primary mr-3" key={optionIndex}>
                                                                        <span>{option.name}</span>
                                                                            <input {...register(option.id + '-' + parent.id) }
                                                                                type="checkbox"
                                                                                defaultChecked={(option.isChecked == '1')? true : false}
                                                                            />
                                                                        <span className="slider"></span>
                                                                    </label>
                                                                )
                                                            })}

                                                            {parent.childs.map((child, childIndex) => {

                                                                return (
                                                                    <Card.Body key={childIndex}>
                                                                        <h6 className="font-weight-bold">{child.name}</h6>
                                                                        <br />
                                                                        {child.options.map((childsOption, childsOptionIndex) => {
                                                                            AllOptions.push(childsOption.id + '-' + child.id);
                                                                            return (                                                                                
                                                                                <label className="switch pr-5 switch-primary mr-3" key={childsOptionIndex}>
                                                                                    <span>{childsOption.name}</span>                                                                                        
                                                                                        <input {...register(childsOption.id + '-' + child.id)}
                                                                                            type="checkbox"
                                                                                            defaultChecked={(childsOption.isChecked == '1')? true : false}
                                                                                            onBlur={(e) => selectMyParent(e, ParentIndex)}
                                                                                        />
                                                                                    <span className="slider"></span>
                                                                                </label>
                                                                            )
                                                                        })}








                                                                        {child.sub_childs.map((sub_child, subChildIndex) => {
                                                                            return (
                                                                                <Card.Body key={subChildIndex}>
                                                                                    <h6 className="font-weight-bold">{sub_child.name}</h6>
                                                                                    <br />
                                                                                    {sub_child.options.map((sub_childsOption, sub_childsOptionIndex) => {
                                                                                        AllOptions.push(sub_childsOption.id + '-' + sub_child.id);
                                                                                        return (
                                                                                            // <Controller
                                                                                            //     render={
                                                                                            //         ({ field }) =>
                                                                                            //             <label className="switch pr-5 switch-primary mr-3 mt-2" key={sub_childsOptionIndex}>
                                                                                            //                 <span>{sub_childsOption.name}</span>
                                                                                            //                 <input {...field}
                                                                                            //                     type="checkbox"
                                                                                            //                     onBlur={(e) => selectMyParent(e, subChildIndex)}
                                                                                            //                 />
                                                                                            //                 <span className="slider"></span>
                                                                                            //             </label>
                                                                                            //     }
                                                                                            //     control={control}
                                                                                            //     name={sub_childsOption.id + '-' + sub_child.id}
                                                                                            //     defaultValue={sub_childsOption.isChecked}
                                                                                            // />
                                                                                            <label className="switch pr-5 switch-primary mr-3" key={sub_childsOptionIndex}>
                                                                                                <span>{sub_childsOption.name}</span>                                                                                        
                                                                                                    <input {...register(sub_childsOption.id + '-' + sub_child.id)}
                                                                                                        type="checkbox"
                                                                                                        defaultChecked={(sub_childsOption.isChecked == '1')? true : false}
                                                                                                        onBlur={(e) => selectMyParent(e, subChildIndex)}
                                                                                                    />
                                                                                                <span className="slider"></span>
                                                                                            </label>
                                                                                        )
                                                                                    })}
                                                                                </Card.Body>
                                                                            )
                                                                        })}

                                                                    </Card.Body>
                                                                )
                                                            })}
                                                        </Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>
                                            </Accordion>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Layout3>
    );
};

export default editRole;
