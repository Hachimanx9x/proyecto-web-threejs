import React from "react";
import TextField from '@material-ui/core/TextField';
import "./CreateProject.css";
const CreateProject = () => {
    return (<div>
        <h4>Hi</h4>
        <TextField
            id="name"
            label="Name"
            variant="filled"
            margin="normal"
            className="o-test-textbox"
            InputLabelProps={{
                shrink: true,
            }}
        />
        <TextField
            id="standard-number"
            label="Number"
            type="number"
           
           
            margin="normal"
        />
    </div>
    );
 
};
export default CreateProject;