import { Grid, Paper, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useContext, useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "2.5em 2em",
        marginTop: "1em"
    },
    element: {
        marginBottom: "1em",
    },
    description_text: {
        fontSize: "80%",
    }
}));

export default function FormBlock({ block, blockIndex, formBlockStore }) {
    const classes = useStyles();
    const [blocksContent, setBlocksContent] = useContext(formBlockStore);
    const [blockValue, setBlockValue] = useState("");

    useEffect(() => {
        if (blocksContent) {
            setBlockValue(blocksContent[blockIndex].answer);
        }
    }, [blocksContent,blockIndex]);

    const handleChange = (e) => {
        var temp_block = {
            blockId: block._id,
            blockType: block.blockType
        }

        if (block.blockType === "checkboxes") {
            if (e.target.checked && blockValue.search(e.target.name) === -1) {
                if (blocksContent[blockIndex].answer === "")
                    temp_block.answer = e.target.name;
                else
                    temp_block.answer = blocksContent[blockIndex].answer + ", " + e.target.name;
            } else if (!e.target.checked) {
                var answer_index = blocksContent[blockIndex].answer.search(e.target.name);
                var answer_len = e.target.name.length;
                if (answer_index === 0)
                    temp_block.answer = blocksContent[blockIndex].answer.substring(answer_len + 2);
                else if (answer_index + answer_len === blocksContent[blockIndex].answer.length)
                    temp_block.answer = blocksContent[blockIndex].answer.substring(0, answer_index - 2);
                else
                    temp_block.answer = blocksContent[blockIndex].answer.substring(0, answer_index) + blocksContent[blockIndex].answer.substring(answer_index + answer_len + 2);
            }
        } else {
            temp_block.answer = e.target.value;
        }

        setBlockValue(e.target.value);

        let newContent = blocksContent;
        newContent[blockIndex] = temp_block;
        setBlocksContent(newContent);
    }

    const renderBlock = (block) => {
        switch (block.blockType) {
            case 'multipleChoice':
                return (<RadioGroup value={blockValue} onChange={handleChange}>
                    {block.options.map(e => (
                        <FormControlLabel value={e} control={<Radio />} label={e} />
                    ))}
                </RadioGroup>);
            case 'checkboxes':
                return (<FormGroup>
                    {block.options.map(e => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={handleChange}
                                    name={e}
                                    color="primary"
                                />
                            }
                            label={e}
                        />
                    ))}
                </FormGroup>);
            case 'dropdown':
                return (<Select
                    value={blockValue}
                    onChange={handleChange}
                >
                    <MenuItem value=""></MenuItem>
                    {block.options.map(e => (
                        <MenuItem value={e}>{e}</MenuItem>
                    ))}
                </Select>);
            case 'shortAnswer':
                return <TextField required label="Answer" variant="outlined"
                    value={blockValue}
                    onInput={handleChange}
                />
            default:
                return <div>Something's wrong...</div>;
        }
    };

    return (
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs={12} className={classes.element}>
                    <Grid container justify="space-between">
                        <Typography>{block.question}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.element}>
                    <Typography className={classes.description_text}>{block.description}</Typography>
                </Grid>
                {renderBlock(block)}
            </Grid>
        </Paper>
    );
}