import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import AddTaskForm from './add-task-form'

export default function AddTask() {
  return (
   <>
   <Dialog>
    <DialogTrigger asChild>
        <Button className='flex gap-2' variant={'ghost'}>
            <Plus />
            <p>Add Task</p>
        </Button>
    </DialogTrigger>

    <DialogContent>
        <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <DialogDescription>
            Add a new task to your list
        </DialogDescription>
        <AddTaskForm />
    </DialogContent>
   </Dialog>
   </>
  )
}
