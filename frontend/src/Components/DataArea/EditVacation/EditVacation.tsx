import { useNavigate, useParams } from "react-router-dom";
import "./EditVacation.css";
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import { useForm } from "react-hook-form";
import vacationService from "../../../Services/VacationsService";
import notify from "../../../Services/NotifyService";

function EditVacation(): JSX.Element {
    const params = useParams();
    const [vacation, setVacation] = useState<VacationModel>(new VacationModel);
    const {register, handleSubmit, formState, setValue} = useForm<VacationModel>();
    const navigate = useNavigate();

    useEffect(()=>{
        vacationService.getVacationById(+(params.vacationID))
        .then(vacation=>{
            setVacation(vacation);
            setValue("vacationID", vacation.vacationID);
            setValue("destination", vacation.destination);
            setValue("description", vacation.description);
            setValue("startDate", vacation.startDate);
            setValue("endDate", vacation.endDate);
            setValue("price", vacation.price);
            setValue("imageName", vacation.imageName);
        })
        .catch(err => notify.errorMsg(err))
    },[]);

    async function send(vacation:VacationModel) {
        try {
            await vacationService.updateVacation(vacation);
            notify.successMsg("Vacation updated successfully!");
            navigate("/vacations");
        } catch (err:any) {
            notify.errorMsg(err);
        }
    }

    return (
        <div className="EditVacation">
			<form onSubmit={handleSubmit(send)}>
                <h2>Edit Vacation</h2>

                <input type="hidden" {...register("vacationID")} />

                <label>Start date: </label>
                <input type="date" {...register("startDate", VacationModel.startDateValidation)}/>
                <p className="error">{formState.errors.startDate?.message}</p>

                <label>End date: </label>
                <input type="date" {...register("endDate", VacationModel.endDateValidation)}/>
                <p className="error">{formState.errors.endDate?.message}</p>
                
                <label>Destination: </label>
                <input type="text" {...register("destination", VacationModel.destinationValidation)}/>
                <p className="error">{formState.errors.destination?.message}</p>
                
                <label>Description: </label>
                <input type="text" {...register("description", VacationModel.descriptionValidation)}/>
                <p className="error">{formState.errors.description?.message}</p>

                <label>Price: $</label>
                <input type="number" step={1} {...register("price", VacationModel.priceValidation)}/>
                <p className="error">{formState.errors.price?.message}</p>

                <label>imageName: </label>
                <input type="text" {...register("imageName")}/>

                <br />
                <button>Update Vacation</button>
            </form>
        </div>
    );
}

export default EditVacation;
