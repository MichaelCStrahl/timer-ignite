import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles'

export function Home() {
  // controlled
  // const [task, setTask] = useState('')

  // uncontrolled
  // function handleSubmit(event) {
  //   event.target.task.value
  // }

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
      .number()
      .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
      .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
  })

  /**
   * Inferindo tipagem do próprio validator
   */

  // interface NewCycleFormData {
  //   task: string
  //   minutesAmount: number
  // }

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  /**
   * formState.error -> Retorna o erro da validação
   */
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <FormContainer>
        <form
          // uncontrolled
          // onSubmit={handleSubmit}
          onSubmit={handleSubmit(handleCreateNewCycle)}
          action=""
        >
          <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
              id="task"
              list="task-suggestions"
              placeholder="Dê um nome para o seu projeto"
              // controlled
              // onChange={(e) => setTask(e.target.value)}
              // value={task}
              {...register('task')}
            />
            <datalist id="task-suggestions">
              <option value="Projeto 1"></option>
              <option value="Projeto 2"></option>
              <option value="Projeto 3"></option>
              <option value="Banana"></option>
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput
              type="number"
              id="minutesAmount"
              placeholder="00"
              step={5}
              min={5}
              max={60}
              {...register('minutesAmount', { valueAsNumber: true })}
            />

            <span>minutos.</span>
          </FormContainer>

          <CountDownContainer>
            <span>0</span>
            <span>0</span>
            <Separator>:</Separator>
            <span>0</span>
            <span>0</span>
          </CountDownContainer>

          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountDownButton>
        </form>
      </FormContainer>
    </HomeContainer>
  )
}
