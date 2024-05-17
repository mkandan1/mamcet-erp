import { Breadcamps } from "../components/Breadcumps";
import { Container } from "../components/Container";
import { FormControll } from "../components/FormControll";
import { SelectInput, TextInput } from "../components/Input";
import { PageHeading } from "../components/PageHeading";

export const CreateCourse = () => {
    return(
        <Container>
            <Breadcamps paths={{'Home': '/', 'Courses': '/courses/all', 'Create course': ''}}/>
            <PageHeading heading={'Create Course'}></PageHeading>

            <FormControll>
                <SelectInput label={'Institution'} placeholder={'Select Institution'} required={true}/>
                <SelectInput label={'Program'} placeholder={'Select Program'} required={true}/>
                <TextInput label={'Course Name'} placeholder={'Enter Course name'} type={'text'} required={true}/>
                <SelectInput label={'Duration'} placeholder={'Select Duration'} required={true}/>
                <SelectInput label={'Teaching Mode'} placeholder={'Select Teaching mode'} required={true}/>
                <SelectInput label={'Qualification'} placeholder={'Select Qualification'} required={true}/>
            </FormControll>
        </Container>
    );
}