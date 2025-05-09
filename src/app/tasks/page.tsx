'use client'

import { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, CardHeader, Chip, CircularProgress, IconButton, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTaskStore } from '@/lib/stores/taskStore'
import TaskForm from '@/components/tasks/TaskForm'
import { Task, TaskStatus, TASK_STATUSES } from '@/lib/schemas/task'

export default function TasksPage() {
  const { tasks, loading, fetchTasks, addTask, updateTask, deleteTask } = useTaskStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All')

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleAddTask = async (taskData: any) => {
    await addTask(taskData)
    setIsDialogOpen(false)
  }

  const handleEditTask = (task: Task) => {
    setSelectedTask(task)
    setIsDialogOpen(true)
  }

  const handleUpdateTask = async (taskData: any) => {
    if (selectedTask) {
      await updateTask(selectedTask.id, taskData)
      setIsDialogOpen(false)
      setSelectedTask(null)
    }
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id)
  }

  const filteredTasks = statusFilter === 'All' ? tasks : tasks.filter(task => task.status === statusFilter)

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Tasks & To-Dos</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setSelectedTask(null); setIsDialogOpen(true) }}>
          Add Task
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} mb={2}>
        <Chip label="All" color={statusFilter === 'All' ? 'primary' : 'default'} onClick={() => setStatusFilter('All')} />
        {TASK_STATUSES.map(status => (
          <Chip key={status} label={status} color={statusFilter === status ? 'primary' : 'default'} onClick={() => setStatusFilter(status)} />
        ))}
      </Stack>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2}>
          {filteredTasks.length === 0 ? (
            <Typography color="text.secondary">No tasks found.</Typography>
          ) : (
            filteredTasks.map(task => (
              <Card key={task.id}>
                <CardHeader
                  title={task.title}
                  subheader={`Due: ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}`}
                  action={
                    <Stack direction="row" spacing={1}>
                      <IconButton onClick={() => handleEditTask(task)}><EditIcon /></IconButton>
                      <IconButton onClick={() => handleDeleteTask(task.id)}><DeleteIcon /></IconButton>
                    </Stack>
                  }
                />
                <CardContent>
                  <Typography variant="body2" gutterBottom>{task.description}</Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label={task.status} color={task.status === 'Completed' ? 'success' : task.status === 'Blocked' ? 'error' : 'info'} size="small" />
                    <Chip label={task.priority} size="small" />
                    {task.tags.map(tag => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      )}
      <TaskForm
        open={isDialogOpen}
        onClose={() => { setIsDialogOpen(false); setSelectedTask(null) }}
        onSubmit={selectedTask ? handleUpdateTask : handleAddTask}
        initialValues={selectedTask || undefined}
        title={selectedTask ? 'Edit Task' : 'Add New Task'}
      />
    </Box>
  )
}
