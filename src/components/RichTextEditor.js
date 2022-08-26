import { useMutation, useQuery } from '@apollo/client';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
const { Host_RichEditor_QUERY, Event_RichEditor_MUTATION } = require('../graphql');

const useStyles = makeStyles({
    container: {
        marginTop: "20px",
        paddingBottom: "20px",
        overflow: "auto",
    },
    submitBut: {
        marginTop: "20px",
        float: "right",
    }
});

function RichTextEditor(props) {
    const classes = useStyles();
    const [content, setContent] = useState("");

    const { loading, error, data, refetch } = useQuery(Host_RichEditor_QUERY, { variables: { eventId: props.eventID } });
    if (error) console.log(error);

    useEffect(() => {
        setContent("")
        if (!loading) {
            if (props.tab === 2 && data.getEvent.description !== null)
                setContent(data.getEvent.description);
            if (props.tab === 3 && data.getEvent.registrationInfo !== null)
                setContent(data.getEvent.registrationInfo);
            if (props.tab === 4 && data.getEvent.trafficInfo !== null)
                setContent(data.getEvent.trafficInfo);
            if (props.tab === 5 && data.getEvent.prize !== null)
                setContent(data.getEvent.prize);
        }
    },
        [data, props.tab,loading],
    );

    const [saveContent] = useMutation(Event_RichEditor_MUTATION);

    const handleSubmit = async (event) => {
        event.preventDefault();

        var isSuccess = true;
        if (props.tab === 2) {
            try {
                await saveContent({
                    variables: {
                        _id: props.eventID,
                        description: content
                    }
                })
            } catch (e) {
                console.log(e.networkError.result.errors); // here you can see your network
                isSuccess = false;
            }
        } else if (props.tab === 3) {
            try {
                await saveContent({
                    variables: {
                        _id: props.eventID,
                        registrationInfo: content
                    }
                })
            } catch (e) {
                console.log(e.networkError.result.errors); // here you can see your network
                isSuccess = false;
            }
        } else if (props.tab === 4) {
            try {
                await saveContent({
                    variables: {
                        _id: props.eventID,
                        trafficInfo: content
                    }
                })
            } catch (e) {
                console.log(e.networkError.result.errors); // here you can see your network
                isSuccess = false;
            }
        } else {
            try {
                await saveContent({
                    variables: {
                        _id: props.eventID,
                        prize: content
                    }
                })
            } catch (e) {
                console.log(e.networkError.result.errors); // here you can see your network
                isSuccess = false;
            }
        }

        if (isSuccess) {
            alert("編輯成功！");
            refetch();
        } else {
            alert("編輯失敗！請再試一次");
        }
    }

    const handleCKEditorChange = (event, editor) => {
        setContent(editor.getData())
    }

    return (
        <Container className={classes.container}>
            <form>
                <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    config={{
                        toolbar: ['bold', 'italic', '|', 'bulletedList', 'numberedList', 'outdent', 'indent', '|', 'insertTable', 'link', '|', 'undo', 'redo'],
                        image: {
                            resizeUnit: '360px'
                        },
                        indentBlock: {
                            offset: 2,
                            unit: 'em'
                        }
                    }}
                    onChange={handleCKEditorChange}
                />
                <Button className={classes.submitBut} variant="contained" color="default"
                    type="submit"
                    onClick={handleSubmit}
                    style={{ minWidth: "80px" }}
                >
                    <FormattedMessage id='eventBasicInfo.save' />
                </Button>
            </form>
        </Container>
    );
}

export default RichTextEditor;