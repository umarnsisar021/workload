import React,{ useState, useEffect } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { Dropdown } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { InertiaLink,usePage } from "@inertiajs/inertia-react";
import route from "ziggy-js";


import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
    parentF: {
      color: '#369',
    },
    childF: {
        color: '#000',
      },
  });


export default function AccountChart (props) {

    const { sub_title, title,data}=props;
    const {base_url}=usePage().props;

    const classes = useStyles();

    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };

    function getNodeId(id){
        console.log(id);
    }

    return (
        <Layout3 title={title}>
            <div className="row mb-4">
                <div className="col-md-12 mb-4">
                    <div className="card text-left">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-md-8">
                                    <h4 className="card-title">
                                        <InertiaLink href={route('home')}>
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
                            </div>
                        </div>
                        <div className="card-body responsive">

                                {Object.values(data).map((parent,index) =>(
                                    parent.parent_id==0 ?

                                    parent.is_deleted == 0 ?

                                    <TreeView
                                        defaultCollapseIcon={<ExpandMoreIcon />}
                                        defaultExpandIcon={<ChevronRightIcon />}
                                        expanded={expanded}
                                        selected={selected}
                                        onNodeToggle={handleToggle}
                                        onNodeSelect={handleSelect}
                                        key={index}
                                        className={classes.parentF}
                                        //onNodeSelect={() => console.log(parent.id)}
                                    >


                                    {/* <div className="btn-group mx-5">
                                        <Dropdown>
                                            <DropdownToggle variant="button" className="btn btn-outline-primary btn-sm">
                                                <i className="fas fa-cog"></i>
                                            </DropdownToggle>
                                                <DropdownMenu>
                                                    <InertiaLink href="#" className="dropdown-item cursor-pointer" as="button">
                                                        <i className="fa fa-plus"></i> Add
                                                    </InertiaLink>
                                                </DropdownMenu>
                                        </Dropdown>
                                    </div> */}

                                        <TreeItem
                                            nodeId={`${parent.id}`}
                                            label={parent.coa_title+' ('+parent.code+')' }
                                            onLabelClick={(event)=>{event.preventDefault();getNodeId(parent.id)}}
                                        >

                                            {Object.values(data).map((child,cIndex) =>(
                                                parent.id == child.parent_id ?

                                                child.is_deleted == 0 ?

                                                <TreeView
                                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                                    defaultExpandIcon={<ChevronRightIcon />}
                                                    expanded={expanded}
                                                    selected={selected}
                                                    onNodeToggle={handleToggle}
                                                    onNodeSelect={handleSelect}
                                                    key={cIndex}
                                                >


                                                    <TreeItem
                                                        nodeId={`${child.id}`}
                                                        label={child.coa_title+' ('+parent.code+'-'+child.code+')'}
                                                        onLabelClick={(event)=>{event.preventDefault();getNodeId(child.id)}}
                                                    >


                                                        {Object.values(data).map((subChild,sIndex) =>(
                                                            child.id == subChild.parent_id ?

                                                            subChild.is_deleted == 0 ?

                                                            <TreeView
                                                                defaultCollapseIcon={<ExpandMoreIcon />}
                                                                defaultExpandIcon={<ChevronRightIcon />}
                                                                expanded={expanded}
                                                                selected={selected}
                                                                onNodeToggle={handleToggle}
                                                                onNodeSelect={handleSelect}
                                                                key={sIndex}
                                                            >

                                                                <TreeItem
                                                                    nodeId={`${subChild.id}`}
                                                                    label={subChild.coa_title+' ('+parent.code+'-'+child.code+'-'+subChild.code+')'}
                                                                    onLabelClick={(event)=>{event.preventDefault();getNodeId(subChild.id)}}
                                                                >

                                                                    {Object.values(data).map((subChild1,subIndex) =>(
                                                                        subChild.id == subChild1.parent_id ?

                                                                            subChild1.is_deleted == 0 ?

                                                                            <TreeView
                                                                                defaultCollapseIcon={<ExpandMoreIcon />}
                                                                                defaultExpandIcon={<ChevronRightIcon />}
                                                                                expanded={expanded}
                                                                                selected={selected}
                                                                                onNodeToggle={handleToggle}
                                                                                onNodeSelect={handleSelect}
                                                                                key={subIndex}
                                                                                className={classes.childF}
                                                                            >
                                                                                <TreeItem
                                                                                    nodeId={`${subChild1.id}`}
                                                                                    label={subChild1.coa_title+' ('+parent.code+'-'+child.code+'-'+subChild.code+'-'+subChild1.code+')'}
                                                                                    onLabelClick={(event)=>{event.preventDefault();getNodeId(subChild1.id)}}
                                                                                >

                                                                                    {Object.values(data).map((lastChild,lastIndex) =>(

                                                                                        subChild1.id == lastChild.parent_id ?

                                                                                            lastChild.is_deleted == 0 ?

                                                                                            <TreeView
                                                                                                expanded={expanded}
                                                                                                selected={selected}
                                                                                                onNodeToggle={handleToggle}
                                                                                                onNodeSelect={handleSelect}
                                                                                                key={lastIndex}
                                                                                            >

                                                                                                <TreeItem
                                                                                                    nodeId={`${lastChild.id}`}
                                                                                                    label={lastChild.coa_title+' ('+parent.code+'-'+child.code+'-'+subChild.code+'-'+subChild1.code+'-'+lastChild.code+')'}
                                                                                                    onLabelClick={(event)=>{event.preventDefault();getNodeId(lastChild.id)}}
                                                                                                />

                                                                                            </TreeView>
                                                                                            :null  /* Last Child Sub Child1 Id == Last child Id null */
                                                                                        :null  /* LastChild Is_deleted == 0 null */

                                                                                    ))}

                                                                                </TreeItem>
                                                                            </TreeView>
                                                                            :null  /* Sub Child1 Sub Child Id == sub child1 Id null */
                                                                        :null  /* Sub Child 1 Is_deleted == 0 null */
                                                                    ))}

                                                                </TreeItem>


                                                            </TreeView>
                                                            :null  /* Sub Child child Id == sub child Id null */

                                                            :null   /* Sub Child Deleted Id == 0 null */
                                                        ))}

                                                    </TreeItem>
                                                </TreeView>
                                            :null /* child Is_deleted == 0 null */

                                            :null  /* Child parent Id == child Id null */

                                            ))}

                                        </TreeItem>

                                    </TreeView>
                                    :null  /* Parent deleted == 0 null */

                                    : null  /* Parent parent Id == 0 null */
                                ))}

                        </div>
                    </div>
                </div>
            </div>
        </Layout3>
    );
};
