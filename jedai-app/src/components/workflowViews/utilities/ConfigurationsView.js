import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Form, Col, Table, Row } from 'react-bootstrap/'

class ConfigurationsView extends Component {

    confLabels = new Map([
        ['filename', 'Filename'],
        ['first_row', 'First Row'],
        ['seperator', 'Seperator'],
        ['id_index', 'ID index'],
        ['excluded_attr', 'Excluded attirbutes'],

        ['url', 'DB URL'],
        ['table', 'Table'],
        ['username', 'Username'],
        ['ssl', 'SSL']
      ]);


    render() {
        var title_col = 2
        var empty_col = 1
        var value_col_1 = 1
        var value_col_2 = 2
        var big_col = 6
        const {data, title, type} = this.props
        var return_stmnt = null

        if(type === "inline"){
            if (data.configuration_type !== ""){
                if(data.configuration_type === "Manual"){
                    return_stmnt = 
                            <Form.Row>
                                <Col sm={title_col}>
                                    <Form.Label style={{color:"#990000"}}><h5>{title+ ": "}</h5></Form.Label> 
                                </Col>
                                <Col sm={empty_col}></Col>
                                <Col sm={big_col}>
                                    <Table  striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th style={{color:"#990000"}}>Method</th>
                                                {data.parameters.map((parameter) => (<th style={{color:"#990000"}}>{parameter.label}</th>))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr> 
                                                {data.label}
                                               {data.parameters.map((parameter) => (<td>{parameter.value}</td>))} 
                                             </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Form.Row>
                }
                else {
                    return_stmnt = 
                            <Form.Row>
                                <Col sm={title_col}>
                                    <Form.Label style={{color:"#990000"}}><h5>{title+ ": "}</h5></Form.Label> 
                                </Col>
                                <Col sm={empty_col}></Col>
                                <Col sm={value_col_2}>
                                    {data.label}
                                </Col>
                                <Col sm={value_col_2}>
                                    <h5 style={{color:"#990000", marginRight:'100px'}}>Configuration:</h5> 
                                </Col>
                                <Col sm={value_col_1}>
                                    {data.configuration_type}
                                </Col>
                            </Form.Row>
                }
            }
            else            
                return_stmnt =
                        <Form.Row>
                            <Col sm={title_col}>
                                <Form.Label style={{color:"#990000"}}><h5>{title+ ": "}</h5></Form.Label> 
                            </Col>
                            <Col sm={empty_col}></Col>
                            <Col sm={2}>
                                {data.label}
                            </Col>
                        </Form.Row>

        }


        else if (type === "array"){
            
            return_stmnt = 
                    <Form.Row>
                        <Col sm={title_col}>
                            <Form.Label style={{color:"#990000"}}><h5>{this.props.title + ": "}</h5></Form.Label> 
                        </Col>
                        <Col sm={empty_col}></Col>
                        <Col sm={big_col}>
                            <Table  striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{color:"#990000"}}>Method</th>
                                        <th style={{color:"#990000"}}>Configuration</th>
                                        <th style={{color:"#990000"}}>Parameters</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((method) => (
                                        <tr> 
                                            <td>{method.label}</td>
                                            <td>{method.configuration_type}</td>
                                            <td>
                                                {method.parameters.map((parameter) => (
                                                    <Row>
                                                        <Col>
                                                            {parameter.label}
                                                        </Col>
                                                        <Col>
                                                            {parameter.value}
                                                        </Col>
                                                    </Row>
                                                ))}
                                                
                                            </td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Form.Row>                
        }

        else if (type === "file"){
            var keys = Object.keys(data.conf);
            return_stmnt =
                
                    <Form.Row>
                        <Col sm={title_col}>
                            <Form.Label style={{color:"#990000"}}><h5>{this.props.title + ": "}</h5></Form.Label> 
                        </Col>
                        <Col sm={empty_col}></Col>
                        <Col sm={big_col}>
                            <Form.Control as="select" multiple>
                                <option key="filetype">Source: {data.source}</option>
                                {keys.map((key) => (
                                    this.confLabels.has(key) ?
                                    <option key={key}>{this.confLabels.get(key) + ": " + data.conf[key]}</option>
                                    : <div/>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Row>         
        }
        return(
            <div>
                <div style={{margin:'auto', position:'relative', left:'12%'}}>
                    {return_stmnt}
                </div>
                <hr style={{ color: 'black', backgroundColor: 'black', height: '1', marginBottom:'5px' }}/>
            </div>
        )
    }
}

ConfigurationsView.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired

  }

export default ConfigurationsView

