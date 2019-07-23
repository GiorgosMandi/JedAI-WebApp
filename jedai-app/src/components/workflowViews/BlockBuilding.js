import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import {Form, Row, FormControl, Col, Jumbotron, Collapse } from 'react-bootstrap/'
import CheckboxMethod from './utilities/CheckboxMethod'
import AlertModal from './utilities/AlertModal'
import "../../css/main.css"

class BlockBuilding extends Component {

    constructor(...args) {
        super(...args);
        this.submitChange = this.submitChange.bind(this)
        this.alertText = "Select at least one Block Building method!"


         // Default values of the configuration of the methods
         this.default_parameters = [
            {
                parameters:[]
            },
            {
                parameters:
                    [
                        {
                            label: "Window Size",
                            value: 4
                        }
                    ]
                
            },
            {
                parameters:
                    [   
                        {
                            label: "Window Size",
                            value: 2
                        }
                    ]
            },
            {
                parameters:
                    [
                        {
                            label: "Q-Gram Size",
                            value: 6
                        }
                    ]
            },
            { 
                parameters: 
                    [
                        {
                            label: "Q-Gram Size",
                            value: 6
                        },
                        {
                            label: "Combination Threshold",
                            value: 0.95
                        }
                    ]   
            },
            {
                parameters: 
                    [
                        {
                            label: "Minimum Suffix Lenght",
                            value: 6
                        },
                        {
                            label: "Maximum Suffix Frequency",
                            value: 0.95
                        }
                    ]
            },
            {
                parameters: 
                    [
                        {
                            label: "Minimum Substring Lenght",
                            value: 6
                        },
                        {
                            label: "Maximum Substring Frequency",
                            value: 39
                        }
                    ]
            },
            {
                parameters: 
                    [
                        {
                            label: "Band Size",
                            value: 5
                        },
                        {
                            label: "Number of Bands",
                            value: 30
                        }
                    ]
            },
            {
                parameters: 
                    [
                        {
                            label: "Band Size",
                            value: 5
                        },
                        {
                            label: "Number of Bands",
                            value: 30
                        }
                    ]
            }
        ]

        if (this.props.state !== null){
            var selected_methods = new Map()
            this.props.state.forEach((selected_method) => {
                selected_methods.set(selected_method.name, selected_method)
            })

            // in case user has already selected and returned back, initialize state based on father component's state
            this.state = {
                block_building : [
                    {
                        name: "STANDARD_TOKEN_BUILDING",
                        selected: selected_methods.has("STANDARD_TOKEN_BUILDING") ? selected_methods.get("STANDARD_TOKEN_BUILDING").selected : false,
                        label: "Standard/Token Blocking",
                        conf_type: selected_methods.has("STANDARD_TOKEN_BUILDING") ? selected_methods.get("STANDARD_TOKEN_BUILDING").conf_type : "Default",
                        parameters: selected_methods.has("STANDARD_TOKEN_BUILDING") ? selected_methods.get("STANDARD_TOKEN_BUILDING").parameters : this.default_parameters[0].parameters
                    },  
                    {
                        name: "SORTED_NEIGHBORHOOD",
                        selected: selected_methods.has("SORTED_NEIGHBORHOOD") ? selected_methods.get("SORTED_NEIGHBORHOOD").selected : false,
                        label: "Sorted Neighborhood",
                        conf_type: selected_methods.has("SORTED_NEIGHBORHOOD") ? selected_methods.get("SORTED_NEIGHBORHOOD").conf_type : "Default",
                        parameters: selected_methods.has("SORTED_NEIGHBORHOOD") ? selected_methods.get("SORTED_NEIGHBORHOOD").parameters : this.default_parameters[1].parameters
                    },  
                    {
                        name: "SORTED_NEIGHBORHOOD_EXTENDED",
                        selected: selected_methods.has("SORTED_NEIGHBORHOOD_EXTENDED") ? selected_methods.get("SORTED_NEIGHBORHOOD_EXTENDED").selected : false,
                        label: "Extended Sorted Neighborhood",
                        conf_type: selected_methods.has("SORTED_NEIGHBORHOOD_EXTENDED") ? selected_methods.get("SORTED_NEIGHBORHOOD_EXTENDED").conf_type : "Default",
                        parameters: selected_methods.has("SORTED_NEIGHBORHOOD_EXTENDED") ? selected_methods.get("SORTED_NEIGHBORHOOD_EXTENDED").parameters : this.default_parameters[2].parameters
                    },  
                    {
                        name: "Q_GRAMS_BLOCKING",
                        selected: selected_methods.has("Q_GRAMS_BLOCKING") ? selected_methods.get("Q_GRAMS_BLOCKING").selected : false,
                        label: "Q-Grams Blocking",
                        conf_type: selected_methods.has("Q_GRAMS_BLOCKING") ? selected_methods.get("Q_GRAMS_BLOCKING").conf_type : "Default",
                        parameters: selected_methods.has("Q_GRAMS_BLOCKING") ? selected_methods.get("Q_GRAMS_BLOCKING").parameters : this.default_parameters[3].parameters
                    },  
                    {
                        name: "Q_GRAMS_BLOCKING_EXTENDED",
                        selected: selected_methods.has("Q_GRAMS_BLOCKING_EXTENDED") ? selected_methods.get("Q_GRAMS_BLOCKING_EXTENDED").selected : false,
                        label: "Extended Q-Grams Blocking",
                        conf_type: selected_methods.has("Q_GRAMS_BLOCKING_EXTENDED") ? selected_methods.get("Q_GRAMS_BLOCKING_EXTENDED").conf_type : "Default",
                        parameters: selected_methods.has("Q_GRAMS_BLOCKING_EXTENDED") ? selected_methods.get("Q_GRAMS_BLOCKING_EXTENDED").parameters : this.default_parameters[4].parameters
                    },  
                    {
                        name: "SUFFIX_ARRAYS_BLOCKING",
                        selected: selected_methods.has("SUFFIX_ARRAYS_BLOCKING") ? selected_methods.get("SUFFIX_ARRAYS_BLOCKING").selected : false,
                        label: "Suffix Arrays Blocking",
                        conf_type: selected_methods.has("SUFFIX_ARRAYS_BLOCKING") ? selected_methods.get("SUFFIX_ARRAYS_BLOCKING").conf_type : "Default",
                        parameters: selected_methods.has("SUFFIX_ARRAYS_BLOCKING") ? selected_methods.get("SUFFIX_ARRAYS_BLOCKING").parameters : this.default_parameters[5].parameters
                    },  
                    {
                        name: "SUFFIX_ARRAYS_BLOCKING_EXTENDED",
                        selected: selected_methods.has("SUFFIX_ARRAYS_BLOCKING_EXTENDED") ? selected_methods.get("SUFFIX_ARRAYS_BLOCKING_EXTENDED").selected : false,
                        label: "Extended Suffix Arrays Blocking",
                        conf_type: selected_methods.has("SUFFIX_ARRAYS_BLOCKING_EXTENDED") ? selected_methods.get("SUFFIX_ARRAYS_BLOCKING_EXTENDED").conf_type : "Default",
                        parameters: selected_methods.has("SUFFIX_ARRAYS_BLOCKING_EXTENDED") ? selected_methods.get("SUFFIX_ARRAYS_BLOCKING_EXTENDED").parameters : this.default_parameters[6].parameters
                    },  
                    {
                        name: "LSH_SUPERBIT_BLOCKING",
                        selected: selected_methods.has("LSH_SUPERBIT_BLOCKING") ? selected_methods.get("LSH_SUPERBIT_BLOCKING").selected : false,
                        label: "LSH SuperBit Blocking",
                        conf_type: selected_methods.has("LSH_SUPERBIT_BLOCKING") ? selected_methods.get("LSH_SUPERBIT_BLOCKING").conf_type : "Default",
                        parameters: selected_methods.has("LSH_SUPERBIT_BLOCKING") ? selected_methods.get("LSH_SUPERBIT_BLOCKING").parameters : this.default_parameters[7].parameters
                    },  
                    {
                        name: "LSH_MINHASH_BLOCKING",
                        selected: selected_methods.has("LSH_MINHASH_BLOCKING") ? selected_methods.get("LSH_MINHASH_BLOCKING").selected : false,
                        label: "LSH MinHash Blocking",
                        conf_type: selected_methods.has("LSH_MINHASH_BLOCKING") ? selected_methods.get("LSH_MINHASH_BLOCKING").conf_type : "Default",
                        parameters: selected_methods.has("LSH_MINHASH_BLOCKING") ? selected_methods.get("LSH_MINHASH_BLOCKING").parameters : this.default_parameters[8].parameters
                    } 
            ],
            alertShow : false
        }

        }
        else{
            this.state = {
                block_building : [
                    {
                        name: "STANDARD_TOKEN_BUILDING",
                        selected: false,
                        label: "Standard/Token Blocking",
                        conf_type: "Default",
                        parameters:  this.default_parameters[0].parameters
                    },  
                    {
                        name: "SORTED_NEIGHBORHOOD",
                        selected: false,
                        label: "Sorted Neighborhood",
                        conf_type: "Default",
                        parameters:  this.default_parameters[1].parameters
                    },  
                    {
                        name: "SORTED_NEIGHBORHOOD_EXTENDED",
                        selected: false,
                        label: "Extended Sorted Neighborhood",
                        conf_type: "Default",
                        parameters:  this.default_parameters[2].parameters
                    },  
                    {
                        name: "Q_GRAMS_BLOCKING",
                        selected: false,
                        label: "Q-Grams Blocking",
                        conf_type: "Default",
                        parameters:  this.default_parameters[3].parameters
                    },  
                    {
                        name: "Q_GRAMS_BLOCKING_EXTENDED",
                        selected: false,
                        label: "Extended Q-Grams Blocking",
                        conf_type: "Default",
                        parameters:  this.default_parameters[4].parameters
                    },  
                    {
                        name: "SUFFIX_ARRAYS_BLOCKING",
                        selected: false,
                        label: "Suffix Arrays Blocking",
                        conf_type: "Default",
                        parameters:  this.default_parameters[5].parameters
                    },  
                    {
                        name: "SUFFIX_ARRAYS_BLOCKING_EXTENDED",
                        selected: false,
                        label: "Extended Suffix Arrays Blocking",
                        conf_type: "Default",
                        parameters:  this.default_parameters[6].parameters
                    },  
                    {
                        name: "LSH_SUPERBIT_BLOCKING",
                        selected: false,
                        label: "LSH SuperBit Blocking",
                        conf_type: "Default",
                        parameters:  this.default_parameters[7].parameters
                    },  
                    {
                        name: "LSH_MINHASH_BLOCKING",
                        selected: false,
                        label: "LSH MinHash Blocking",
                        conf_type: "Default",
                        parameters:  this.default_parameters[8].parameters
                    } 
                ],
                alertShow : false
            }
        } 
    }




    // Change the parameters of the method
    onChange = (e, index, parameter_index) => {
        var value = e.target.value
        if (!isNaN(value) && value!== ""){

            // first calculate the new parameters
            var updated_state = update(this.state.block_building[index].parameters[parameter_index], {value: {$set: value}}); 
            var newData = update(this.state.block_building[index].parameters, {
                    $splice: [[parameter_index, 1, updated_state]]
            });         

            //then, apply them to the state
            this.setState(state => {
                const block_building = state.block_building.map((method, i) => {
                    if (i === index) 
                        return {...method, parameters: newData}
                    else 
                        return method;
                });
                return { block_building,};
            });
        }
    }
                
        

    
    submitChange(child_state){
        this.setState({
            block_building: this.state.block_building.map(el => (el.name === child_state.name ? {...child_state} : el))
            });
    }


    //handle alert modal
    handleAlertClose = () => this.setState({alertShow : false});
    handleAlerShow = () => this.setState({alertShow : true});


    // Put selected methods into an array and return them back to the father compoenent
    // User is required to select a method, otherwise she can not pass this step
    isValidated(){
        var selected_methods = []
        this.state.block_building.forEach((method) => {
            if (method.selected){
                selected_methods.push(method)
            }
        })
        if (selected_methods.length === 0) {
            this.handleAlerShow()
            return false
        }
        else{
            this.props.submitState("block_building", selected_methods)
            return true
        }
    }




    render() {
        
        //the JSX code of the parameters windows
        var empty_col = 2
        var first_col = 4
        var second_col = 3

        this.BB_parameters_JSX =  
            [
                <div/>
                , 
                <Form>
                    <div style ={{textAlign:'center'}}>
                        <h3>Sorted Neighborhood Blocking</h3>
                        <p>Please configure the method's parameter below</p>
                    </div>
                    <br />
                    <Form.Row className="form-row">
                        <Col sm={empty_col} />
                        <Col sm={first_col} >
                            <Form.Label>Window Size</Form.Label> 
                        </Col>
                        <Col sm={second_col}>
                            <FormControl 
                                type="text" 
                                name="value" 
                                onChange={(e) => this.onChange(e, 1, 0)}
                                value={this.state.block_building[1].parameters[0].value} 
                            />
                        </Col>
                    </Form.Row>
                </Form>
                ,
                <Form>
                    <div style ={{textAlign:'center'}}>
                        <h3>Extended Sorted Neighborhood Blocking</h3>
                        <p>Please configure the method's parameter below</p>
                    </div>
                    <br />
                    <Form.Row className="form-row">
                        <Col sm={empty_col} />
                        <Col sm={first_col} >
                            <Form.Label>Window Size</Form.Label> 
                        </Col>
                        <Col sm={second_col}>
                            <FormControl 
                                type="text" 
                                name="value" 
                                onChange={(e) => this.onChange(e, 2, 0)}
                                value={this.state.block_building[2].parameters[0].value} 
                            />
                        </Col>
                    </Form.Row>
                </Form>
                ,
                <Form>
                    <div style ={{textAlign:'center'}}>
                        <h3>Q-Grams Blocking</h3>
                        <p>Please configure the method's parameter below</p>
                    </div>
                    <br />
                    <Form.Row className="form-row">
                        <Col sm={empty_col} />
                        <Col sm={first_col} >
                            <Form.Label>Q-Gram Size</Form.Label> 
                        </Col>
                        <Col sm={second_col}>
                            <FormControl 
                                type="text" 
                                name="value" 
                                onChange={(e) => this.onChange(e, 3, 0)}
                                value={this.state.block_building[3].parameters[0].value} 
                            />
                        </Col>
                    </Form.Row>
                </Form>
                ,
                <Form>
                    <div style ={{textAlign:'center'}}>
                        <h3>Extended Q-Grams Blocking</h3>
                        <p>Please configure the method's parameters below</p>
                    </div>
                    <br />
                    <Form.Row className="form-row">
                        <Col sm={empty_col} />
                        <Col sm={first_col} >
                            <Form.Label>Q-Gram Size</Form.Label> 
                        </Col>
                        <Col sm={second_col}>
                            <FormControl 
                                type="text" 
                                name="value" 
                                onChange={(e) => this.onChange(e, 4, 0)}
                                value={this.state.block_building[4].parameters[0].value} 
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row className="form-row">
                        <Col sm={empty_col} />
                        <Col sm={first_col} >
                            <Form.Label>Combination Threshold</Form.Label> 
                        </Col>
                        <Col sm={second_col}>
                            <FormControl 
                                type="text" 
                                name="value" 
                                onChange={(e) => this.onChange(e, 4, 1)}
                                value={this.state.block_building[4].parameters[1].value} 
                            />
                        </Col>
                    </Form.Row>
                </Form>
                ,
                <Form>
                    <div style ={{textAlign:'center'}}>
                        <h3>Suffix Arrays Blocking</h3>
                        <p>Please configure the method's parameters below</p>
                    </div>
                    <br />
                    <Form.Row className="form-row">
                        <Col sm={empty_col} />
                        <Col sm={first_col} >
                            <Form.Label>Minimum Suffix Lenght</Form.Label> 
                        </Col>
                        <Col sm={second_col}>
                            <FormControl 
                                type="text" 
                                name="value" 
                                onChange={(e) => this.onChange(e, 5, 0)}
                                value={this.state.block_building[5].parameters[0].value} 
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row className="form-row">
                        <Col sm={empty_col} />
                        <Col sm={first_col} >
                            <Form.Label>Maximum Suffix Frequency</Form.Label> 
                        </Col>
                        <Col sm={second_col}>
                            <FormControl 
                                type="text" 
                                name="value" 
                                onChange={(e) => this.onChange(e, 5, 1)}
                                value={this.state.block_building[5].parameters[1].value} 
                            />
                        </Col>
                    </Form.Row>
                </Form>
                ,
                <Form>
                    <div style ={{textAlign:'center'}}>
                        <h3>Extended Suffix Arrays Blocking</h3>
                        <p>Please configure the method's parameters below</p>
                    </div>
                    <br />
                    <Form.Row className="form-row">
                        <Col sm={empty_col} />
                        <Col sm={first_col} >
                            <Form.Label>Minimum Suffix Lenght</Form.Label> 
                        </Col>
                        <Col sm={second_col}>
                            <FormControl 
                                type="text" 
                                name="value" 
                                onChange={(e) => this.onChange(e, 6, 0)}
                                value={this.state.block_building[6].parameters[0].value} 
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row className="form-row">
                        <Col sm={empty_col} />
                        <Col sm={first_col} >
                            <Form.Label>Maximum Suffix Frequency</Form.Label> 
                        </Col>
                        <Col sm={second_col}>
                            <FormControl 
                                type="text" 
                                name="value" 
                                onChange={(e) => this.onChange(e, 6, 1)}
                                value={this.state.block_building[6].parameters[1].value} 
                            />
                        </Col>
                    </Form.Row>
                </Form>
                ,
                <Form>
                    <div style ={{textAlign:'center'}}>
                        <h3>LSH SuperBit Blocking</h3>
                        <p>Please configure the method's parameters below</p>
                    </div>
                    <br />
                    <Form.Row className="form-row">
                        <Col sm={empty_col} />
                        <Col sm={first_col} >
                            <Form.Label>Band Size</Form.Label> 
                        </Col>
                        <Col sm={second_col}>
                            <FormControl 
                                type="text" 
                                name="value" 
                                onChange={(e) => this.onChange(e, 7, 0)}
                                value={this.state.block_building[7].parameters[0].value} 
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row className="form-row">
                        <Col sm={empty_col} />
                        <Col sm={first_col} >
                            <Form.Label>Number of bands</Form.Label> 
                        </Col>
                        <Col sm={second_col}>
                            <FormControl 
                                type="text" 
                                name="value" 
                                onChange={(e) => this.onChange(e, 7, 1)}
                                value={this.state.block_building[7].parameters[1].value} 
                            />
                        </Col>
                    </Form.Row>
                </Form>
                ,
                <Form>
                    <div style ={{textAlign:'center'}}>
                        <h3>LSH MinHash Blocking</h3>
                        <p>Please configure the method's parameters below</p>
                    </div>
                    <br />
                    <Form.Row className="form-row">
                        <Col sm={empty_col} />
                        <Col sm={first_col} >
                            <Form.Label>Band Size</Form.Label> 
                        </Col>
                        <Col sm={second_col}>
                            <FormControl 
                                type="text" 
                                name="value" 
                                onChange={(e) => this.onChange(e, 8, 0)}
                                value={this.state.block_building[8].parameters[0].value} 
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row className="form-row">
                        <Col sm={empty_col} />
                        <Col sm={first_col} >
                            <Form.Label>Number of bands</Form.Label> 
                        </Col>
                        <Col sm={second_col}>
                            <FormControl 
                                type="text" 
                                name="value" 
                                onChange={(e) => this.onChange(e, 8, 1)}
                                value={this.state.block_building[8].parameters[1].value} 
                            />
                        </Col>
                    </Form.Row>
                </Form>
        ]

        this.parameters_collapse = [false, false, false, false, false, false, false, false, false]

        
        // open the Collapses of the Manual configurations 
        for (var i = 0; i < 9; i++) {
            if (this.state.block_building[i].selected && this.state.block_building[i].conf_type === "Manual")    
                this.parameters_collapse[i] = true
            else
                this.parameters_collapse[i] = false
        }





        
        return (
            <div>
                <AlertModal text={this.alertText} show={this.state.alertShow} handleClose={this.handleAlertClose} />
                <br/>
                <div style={{marginBottom:"5px"}}> 
                    <h1 style={{display:'inline', marginRight:"20px"}}>Block Building</h1> 
                    <span className="workflow-desc" >Block Building clusters entities into overlapping blocks in a lazy manner that relies on unsupervised blocking keys: every token in an attribute value forms a key. Blocks are then extracted, based on its equality or on its similarity with other keys.</span>
                </div>

                <br/>
                <hr style={{ color: 'black', backgroundColor: 'black', height: '5' }}/>
                <br/>

                <Form.Group as={Row} className="form-row" > 
                    <Form.Label><h5>Select Block Building methods and Configurations</h5></Form.Label>
                </Form.Group>
                 
               
               
                <CheckboxMethod submitChange={this.submitChange} state={this.state.block_building[0]} disable_manual={true}/>
                
                <CheckboxMethod submitChange={this.submitChange} state={this.state.block_building[1]} configurations={this.SN_configurations}/>
                <Collapse in={this.parameters_collapse[1]} >
                    <div className="jumbotron_parameters_container">
                        <Jumbotron className="jumbotron_parameters">
                            <div style={{margin:"auto"}}>
                                {this.BB_parameters_JSX[1]}
                            </div>  
                        </Jumbotron>
                    </div>
                </Collapse>
                
                <CheckboxMethod submitChange={this.submitChange} state={this.state.block_building[2]} />
                <Collapse in={this.parameters_collapse[2]} >
                    <div className="jumbotron_parameters_container">
                        <Jumbotron className="jumbotron_parameters">
                            <div style={{margin:"auto"}}>
                                {this.BB_parameters_JSX[2]}
                            </div>  
                        </Jumbotron>
                    </div>
                </Collapse>

                <CheckboxMethod submitChange={this.submitChange} state={this.state.block_building[3]} />
                <Collapse in={this.parameters_collapse[3]} >
                    <div className="jumbotron_parameters_container">
                        <Jumbotron className="jumbotron_parameters">
                            <div style={{margin:"auto"}}>
                                {this.BB_parameters_JSX[3]}
                            </div>  
                        </Jumbotron>
                    </div>
                </Collapse>

                <CheckboxMethod submitChange={this.submitChange} state={this.state.block_building[4]} />
                <Collapse in={this.parameters_collapse[4]} >
                    <div className="jumbotron_parameters_container">
                        <Jumbotron className="jumbotron_parameters">
                            <div style={{margin:"auto"}}>
                                {this.BB_parameters_JSX[4]}
                            </div>  
                        </Jumbotron>
                    </div>
                </Collapse>

                <CheckboxMethod submitChange={this.submitChange} state={this.state.block_building[5]} />
                <Collapse in={this.parameters_collapse[5]} >
                    <div className="jumbotron_parameters_container">
                        <Jumbotron className="jumbotron_parameters">
                            <div style={{margin:"auto"}}>
                                {this.BB_parameters_JSX[5]}
                            </div>  
                        </Jumbotron>
                    </div>
                </Collapse>

                <CheckboxMethod submitChange={this.submitChange} state={this.state.block_building[6]} />
                <Collapse in={this.parameters_collapse[6]} >
                    <div className="jumbotron_parameters_container">
                        <Jumbotron className="jumbotron_parameters">
                            <div style={{margin:"auto"}}>
                                {this.BB_parameters_JSX[6]}
                            </div>  
                        </Jumbotron>
                    </div>
                </Collapse>

                <CheckboxMethod submitChange={this.submitChange} state={this.state.block_building[7]} />
                <Collapse in={this.parameters_collapse[7]} >
                    <div className="jumbotron_parameters_container">
                        <Jumbotron className="jumbotron_parameters">
                            <div style={{margin:"auto"}}>
                                {this.BB_parameters_JSX[7]}
                            </div>  
                        </Jumbotron>
                    </div>
                </Collapse>

                <CheckboxMethod submitChange={this.submitChange} state={this.state.block_building[8]} />
                <Collapse in={this.parameters_collapse[8]} >
                    <div className="jumbotron_parameters_container">
                        <Jumbotron className="jumbotron_parameters">
                            <div style={{margin:"auto"}}>
                                {this.BB_parameters_JSX[8]}
                            </div>  
                        </Jumbotron>
                    </div>
                </Collapse>
                
            </div>
        )
    }
}

BlockBuilding.propTypes = {
    submitState: PropTypes.func.isRequired
}

export default BlockBuilding

