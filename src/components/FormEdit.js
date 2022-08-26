import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Container, Grid, IconButton, Input, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddCircleOutline, DeleteOutline } from '@material-ui/icons';
import { createContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from "react-redux";
import FormEditBlock from './FormEditBlock';



const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: "580px"
  },
  paper: {
    padding: "2em",
    marginBottom: "1em"
  },
  title: {
    fontSize: "2em",
    marginBottom: "0.5em"
  },
  saveButton: {
    height: "3em"
  }
}));

const FormContext = createContext(null);

export default function FormEdit(props) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_EVENT_FORM_QUERY, { variables: { eventId: props.eventID } });
  const [formData, setFormData] = useState();
  const [uniqueKey, setUniqueKey] = useState(1);
  const locale = useSelector(state => state.locale.locale);
  const form_description = locale==="en"?"Form description":"表單敘述"

  if (error) console.log(error);

  const [editEventForm] = useMutation(UPDATE_EVENT_FORM_MUTATION);

  const getUniqueKey = () => {
    setUniqueKey(prevState => prevState + 1);
    return uniqueKey;
  }

  const handleAddBlockClick = (_, index) => {
    const newFormData = Object.assign({}, formData);
    newFormData.blocks.splice(index + 1, 0, {
      "blockType": "multipleChoice",
      "blockId": getUniqueKey()
    });
    setFormData(newFormData);
  }

  const handleDeleteClick = (_, index) => {
    const newFormData = Object.assign({}, formData);
    newFormData.blocks.splice(index, 1);
    setFormData(newFormData);
  }

  const handleSaveClick = async (e) => {
    e.preventDefault();

    // Remove blockId property from blocks
    const newFormData = Object.assign({}, formData);
    newFormData.blocks.forEach((block) => (delete block.blockId));

    let success = false;
    try {
      success = await editEventForm({
        variables: {
          _id: props.eventID,
          description: formData.description,
          blocks: newFormData.blocks
        }
      })
    } catch (err) {
      console.log(err.networkError.result.errors);
    }

    if (success) {
      alert("編輯成功！");
    } else {
      alert("編輯失敗！請再試一次");
    }
  }

  const handleFormDescriptionChange = (e) => {
    const newFormData = Object.assign({}, formData);
    newFormData.description = e.target.value;
    setFormData(newFormData);
  }

  // Set form data when first get data from query
  useEffect(() => {
    if (data) {
      let form = data.getEvent.form;
      if (!form.blocks.length) {
        // Set default form block if there is no form data
        form = {
          "blocks": [{
            "blockType": "multipleChoice",
            "blockId": getUniqueKey()
          }]
        };
        setFormData(form);
      } else { // Adjust data retrieved from db
        const newFormData = Object.assign({}, form);
        delete newFormData.__typename; // apollo auto adds this property, delete it
        const newBlocks = Object.assign([], form.blocks);
        for (let i = 0; i < newBlocks.length; ++i) {
          newBlocks[i] = { ...newBlocks[i], "blockId": i } // add block id for each block to use as key when mapped
          delete newBlocks[i].__typename; // apollo auto adds this property, delete it
        }
        newFormData.blocks = newBlocks;
        setFormData(newFormData);
        setUniqueKey(form.blocks.length);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Container className={classes.container} maxWidth="md">
      {loading ? <Typography><FormattedMessage id="loading" /></Typography> : (
        <>
          <Paper className={classes.paper}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography className={classes.title}>{data.getEvent.title}<FormattedMessage id="registration-form"/></Typography>
              <Button className={classes.saveButton} variant="contained" color="primary"
                onClick={handleSaveClick}><FormattedMessage id="save"/></Button>
            </div>
            <Input placeholder={form_description} fullWidth multiline
              defaultValue={data.getEvent.form.description}
              onChange={handleFormDescriptionChange} />
          </Paper>
          { formData && formData.blocks.length ? (
            formData.blocks.map((block, index) => (
              <div key={block.blockId} >
                <FormContext.Provider value={[formData, setFormData]} >
                  <FormEditBlock
                    block={block}
                    blockIndex={index}
                    formContext={FormContext}
                  />
                </FormContext.Provider>
                <Grid container alignItems="center" justify="center" >
                  <Grid item>
                    <IconButton onClick={(e) => handleAddBlockClick(e, index)}>
                      <AddCircleOutline /></IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={(e) => handleDeleteClick(e, index)}>
                      <DeleteOutline /></IconButton>
                  </Grid>
                </Grid>
              </div>))) : ( // Show AddBlock icon when no block is present
            <Grid container alignItems="center" justify="center" >
              <Grid item>
                <IconButton onClick={(e) => handleAddBlockClick(e, 0)}>
                  <AddCircleOutline /></IconButton>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Container>
  );
}

const GET_EVENT_FORM_QUERY = gql`
  query ($eventId: String!) {
    getEvent(eventId: $eventId) {
      title
      form {
        description
        blocks {
          blockType
          question
          description
          options
        }
      }
    }
  }
`;

const UPDATE_EVENT_FORM_MUTATION = gql`
  mutation editEventForm(
    $_id: String!
    $description: String
    $blocks: [EventFormBlockInput]
  ) {
    editEventForm (data: {
      _id: $_id
      description: $description
      blocks: $blocks
    })
  }
`;