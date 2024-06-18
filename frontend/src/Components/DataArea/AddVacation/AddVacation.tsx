import { useForm } from "react-hook-form";
import "./AddVacation.css";
import VacationModel from "../../../Models/VacationModel";
import { useNavigate } from "react-router-dom";
import notify from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationsService";
import GetRole from "../../../Utils/AuthCheck";
import RoleModel from "../../../Models/RoleModel";
import { NavLink } from "react-router-dom";

function AddVacation(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<VacationModel>();
    const navigate = useNavigate();

    async function send(vacation:VacationModel) {
        try {
            // Check that vacation's start is before its end
            if(vacation.startDate > vacation.endDate) throw new Error("End date must be after start date");

            // Check that vaction is in the future
            if(new Date() > new Date(vacation.startDate)) throw new Error("Vacation must take place in the future");
            
            await vacationService.addVacation(vacation);
            notify.successMsg("Vacation added successfully!");
            navigate("/vacations");
        } catch (error:any) {
            notify.errorMsg(error);
        }
    }

    const role = GetRole();

    return (
        <div className="AddVacation">
            {/* Display for logged out guest */}
            {!role && (
            <>
                <h2>Only admins can add vacations. You can <NavLink to="/login">login here</NavLink>.</h2>
            </>
            )}

            {/* Display for regular user */}
            {role === RoleModel.User && (
            <>
                <h2>Only admins can add vacations. You can <NavLink to="/vacations">view vacations here</NavLink>.</h2>
            </>
            )}
            
            {/* Display for admin */}
            {role === RoleModel.Admin && (
            <>
                <form onSubmit={handleSubmit(send)}>
                    <h2>Add Vacation</h2>

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

                    <label>Image: </label>
                    <input type="file" accept="image/*" {...register("image")}/>

                    <button>Add Vacation</button>
                </form>
            </>
            )}
        </div>
    );
}

export default AddVacation;
