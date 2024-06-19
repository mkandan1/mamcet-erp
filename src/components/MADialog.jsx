import { useDispatch, useSelector } from "react-redux";
import { HideMarkAllocationDialog } from "../redux/actions/dialogActions";
import { InternalMarkAllocationTable, UniversityMarkAllocationTable } from "./Table";
import { Icon } from "@iconify/react/dist/iconify.js";

export const MarkAllocationDialog = ({ exam, students, semesters }) => {
    const { show } = useSelector((state) => (state.markAllocationDialog));
    const dispatch = useDispatch();
    if (!show) {
        return
    }
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-white z-10">
            <div className="p-5">
                <div className="flex justify-between">
                    <h1 className="text-lg font-medium tracking-tight">Mark Allocation</h1>
                    <div className="flex gap-5">
                        <h4 className="flex gap-1 text-slate-600 items-center font-mono tracking-tighter"><Icon icon={'tabler:cloud-up'} className="text-lg" /> Auto save enabled</h4>
                        <button className="btn btn-ghost bg-base-300" onClick={() => dispatch(HideMarkAllocationDialog())}>
                            <Icon icon={'iconamoon:close-bold'} className="text-xl" />
                        </button>
                    </div>
                </div>
                <div className="flex">
                    <Card heading={'Program'} text={exam.program} />
                    <Card heading={'Course'} text={exam.course_name} />
                    <Card heading={'Batch'} text={exam.batch_name} />
                    <Card heading={'Semester'} text={exam.semester_name} />
                    <Card heading={'Exam'} text={exam.exam_name} />
                </div>
                {exam.exam_name == 'Internal Exams' ? <InternalMarkAllocationTable students={students} semesters={semesters} exam={exam} /> : <UniversityMarkAllocationTable studentsProp={students} semesters={semesters} exam={exam} />}
            </div>
        </div>
    )
}

const Card = ({ heading, text }) => {
    return (
        <div className="bg-blue-200 min-w-32 flex flex-col border border-blue-500 rounded-md py-1 px-2 m-2">
            <span className="font-medium text-blue-600 flex items-center gap-x-2 text-[14px]">{heading}</span>
            <span className="text-blue-400 text-[13.22px] ml-1">{text}</span>
        </div>
    )
}