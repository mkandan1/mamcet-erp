import { Breadcamps } from "../components/Breadcumps";
import { Container } from "../components/Container";
import { PageHeading } from "../components/PageHeading";

export const Batches = () => {
    return(
        <Container>
            <Breadcamps paths={{'Home': '/', 'Batch List': '/course/batch'}} />
            <PageHeading heading={'Batch List'}>
                {/* TODO: Add button components for create, view, edit */}
                {/* Use IconButton component in component folder*/}
            </PageHeading>
            {/* TODO: Add table for listing all batches */}
            {/* Use Table component in component folder */}
        </Container>
    );
}