import { Container } from "../components/Container";
import { PageHeading } from "../components/PageHeading";

export const CreateBatche = () => {
    return(
        <Container>
            <Breadcamps paths={{'Home': '/', 'Batch List': '/course/batch', 'Create Batch': '/course/batch/create'}} />
            <PageHeading heading={'Create Batch'}/>
        </Container>
    );
}