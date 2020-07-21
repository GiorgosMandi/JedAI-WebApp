import React, { Component } from 'react'
import {Form, Col, Row, Button, Collapse} from 'react-bootstrap/'
import PropTypes from 'prop-types';


 class TestSelection extends Component {
    render() {

        var small = 5
        var large = 6

        var test_options = ["", "Performance Test", "Scaling Test"]
        
        var wf_options = ["", "Best Blocking-based", "Default Blocking-based", "Join-based"]
        if (this.props.test_type == "Scaling Test")
            var wf_options = ["", "Default Blocking-based", "Join-based"]
        
        var dataset_options = [""]
        if(this.props.test_type == "Scaling Test")
            dataset_options = ["", "10K", "50K", "100K", "200K", "300K", "1M", "2M"]
        else{
            if(this.props.er_mode == "clean")
                dataset_options = ["", "ABT-Buy", "Amazon-Gp", "Amazon-Walmart", "DBLP-ACM", "IMDB-DBpedia", "Restaurants", "DBpedia"]
            else if (this.props.er_mode == "dirty")
                dataset_options = ["", "Cora", "CDDB"]
        }
                
        

        return (
            <div>
                <br/>

                <div style={{marginLeft: "15%"}}>
                    <Form.Group as={Row} className="form-row">
                        <Form.Label as="legend" column sm={small}>
                            <h5>Select Test Type:</h5>
                        </Form.Label>
                        <Col sm={large}>
                            <Form.Control 
                                as="select" 
                                placeholder="Select Test type" 
                                name="test_type" 
                                onChange={this.props.change}
                                value={this.props.test_type}
                            >
                                {test_options.map(o => <option key={o} value={o} >{o}</option>)}
                            </Form.Control>
                        </Col>       
                    </Form.Group>

                    <Form.Group as={Row} className="form-row">
                        <Form.Label as="legend" column sm={small}>
                            <h5>Select ER Mode:</h5>
                        </Form.Label>
                        <Col sm={large}>
                            <Form.Control 
                                as="select" 
                                placeholder="Select ER Mode" 
                                name="er_mode" 
                                onChange={this.props.change}
                                value={this.props.test_type == "Scaling Test" ? "dirty": this.props.er_mode}
                                disabled={this.props.test_type == "Scaling Test" || this.props.test_type == ""}
                            >
                                <option key="" value="" ></option>
                                <option key="d" value="dirty" >Dirty Entity Resolution</option>
                                <option key="c" value="clean" >Clean-Clean Entity Resolution</option>
                            </Form.Control>
                        </Col>       
                    </Form.Group>

                    <Form.Group as={Row} className="form-row">
                        <Form.Label as="legend" column sm={small}>
                            <h5>Select Workflow type:</h5>
                        </Form.Label>
                        <Col sm={large}>
                            <Form.Control 
                                as="select" 
                                placeholder="Select Workflow type:" 
                                name="wf_mode" 
                                onChange={this.props.change}
                                value={this.props.wf_mode}
                                disabled={this.props.test_type == "" || this.props.er_mode == ""}
                            >
                                 {wf_options.map(o => <option key={o} value={o} >{o}</option>)}
                            </Form.Control>
                        </Col>       
                    </Form.Group>
                    
                    <Form.Group as={Row} className="form-row">
                        <Form.Label as="legend" column sm={small}>
                            <h5>Select Datasets:</h5>
                        </Form.Label>
                        <Col sm={large}>
                            <Form.Control 
                                as="select" 
                                placeholder="Select Datasets" 
                                name="dt_choice" 
                                onChange={this.props.change}
                                value={this.props.dt_choice}
                                disabled={this.props.er_mode == "" }
                            >
                                {dataset_options.map(o => <option key={o} value={o} >{o}</option>)}
                            </Form.Control>
                        </Col>       
                    </Form.Group>
                    
                </div>
            </div>
        )
    }
}


TestSelection.propTypes = {
    test_type: PropTypes.string.isRequired,
    er_mode: PropTypes.string.isRequired,
    wf_mode: PropTypes.string.isRequired,
    dt_choice: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired
}

export default TestSelection