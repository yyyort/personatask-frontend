import { GetNoteType } from "@/model/notes.model";
import { useParams } from "next/navigation";

const notes: GetNoteType[] = [
    {
        id: 1,
        userId: "1",
        title: "Note 1",
        content: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
        id: 2,
        userId: "1",
        title: "Note 2",
        content: "This is the content of note 2",
    },
    {
        id: 3,
        userId: "1",
        title: "Note 3",
        content: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
        id: 4,
        userId: "1",
        title: "Note 4",
        content: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
        id: 5,
        userId: "1",
        title: "Note 5",
        content: "This is the content of note 5",
    },
    {
        id: 6,
        userId: "1",
        title: "Note 6",
        content: "This is the content of note 6",
    },
    {
        id: 7,
        userId: "1",
        title: "Note 7",
        content: "This is the content of note 7",
    },
    {
        id: 8,
        userId: "1",
        title: "Note 8",
        content: "This is the content of note 8",
    },
    {
        id: 9,
        userId: "1",
        title: "Note 9",
        content: "This is the content of note 9",
    },
    {
        id: 10,
        userId: "1",
        title: "Note 10",
        content: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
        id: 11,
        userId: "1",
        title: "Note 11",
        content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
    },
    {
        id: 12,
        userId: "1",
        title: "Note 12",
        content: "This is the content of note 12",
    },

];


//mock notes data for testing
export async function GET(request: Request, {params}: {params: {noteId?: string}}) {
    const param = params.noteId;

    if (param) {
        //find note by id
        const note = notes.find((note) => note.id === Number(param));

        if (!note) {
            return Response.error();
        }

        return Response.json(note);
    }

    return Response.json(notes);
}