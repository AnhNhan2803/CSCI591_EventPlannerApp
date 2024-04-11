//TODO
//user authorization check
//set organizer value to Current User
//confirmation checks

//uses react-hook-form library for validation
import { useForm } from 'react-hook-form';
import { getFirestore, addDoc } from "firebase/firestore";
import { app } from '../firebaseConfig';

// Create database object
const db = getFirestore(app);

const CreateForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleSubmission = async (data) => await addDoc(collection(db, "events"), {data});
    console.log("Document was written with ID: ", handleSubmission.id);

    /**
     * Handles any errors that arise?
     * 
     * @param {Error} errors
     */
    const handleError = (errors) => {
      console.error("Errors in CreateForm: ", errors)
    };

    const createOptions = {
      title: {required: "Title is required" },
      date: {required: "Date is required "},
      time: {required: "Time is required"},
      location: {required: "Location is required"},
      description: {required: "Description is required"},
      eventType: {required: "At least one event type is required"},
      organizer: {}, //set this value to Current User
      contact: {required: "Contact method is required"}
    };

    return (
        <form onSubmit={handleSubmit(handleSubmission, handleError)}>
              <div>
                <label>Event Title</label>
                <input name="title" type="text" {...register('title', createOptions.title)}/>
                <small className="text-danger">
                    {errors?.name && errors.name.message}
                </small>
            </div>
            <div>
                <label>Date of event</label>
                <input name="date" type="text" {...register('date', createOptions.date)}/>
                <small className="text-danger">
                    {errors?.name && errors.name.message}
                </small>
            </div>
            <div>
                <label>Time of event</label>
                <input name="time" type="text" {...register('time', createOptions.time)}/>
                <small className="text-danger">
                    {errors?.name && errors.name.message}
                </small>
            </div>
            <div>
                <label>Location</label>
                <input name="location" type="text" {...register('location', createOptions.location)}/>
                <small className="text-danger">
                    {errors?.name && errors.name.message}
                </small>
            </div>
            <div>
                <label>Description of Event</label>
                <input name="description" type="text" {...register('description', createOptions.description)}/>
                <small className="text-danger">
                    {errors?.name && errors.name.message}
                </small>
            </div>
            <div>
                <label>Type of event</label>
                <input name="eventType" type="text" {...register('eventType', createOptions.eventType)}/>
                <small className="text-danger">
                    {errors?.name && errors.name.message}
                </small>
            </div>
            <div>
                <label>Contact for Event</label>
                <input name="contact" type="text" {...register('contact', createOptions.contact)}/>
                <small className="text-danger">
                    {errors?.name && errors.name.message}
                </small>
            </div>
        </form>
    )
}

export default CreateForm;