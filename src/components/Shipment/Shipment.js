import React, { useContext } from 'react';
import './Shipment.css'
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';

const Shipment = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)

    console.log(watch("example"))

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (

        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>

            <input placeholder='Your Name' defaultValue={loggedInUser.name} {...register("name", { required: true })} />
            {errors.name && <span className='error'>Name is required</span>}

            <input placeholder='Your Email' defaultValue={loggedInUser.email} {...register("email", { required: true })} />
            {errors.email && <span className='error'>Email is required</span>}

            <input placeholder='Your Phone' {...register("phone", { required: true })} />
            {errors.phone && <span className='error'>Phone is required</span>}

            <input placeholder='Your Address' {...register("address", { required: true })} />
            {errors.address && <span className='error'>Address is required</span>}

            <input type="submit" />
        </form>
    )
};

export default Shipment;