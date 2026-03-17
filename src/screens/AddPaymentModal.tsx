import { useState } from "react"
import { AddDebtPaymentDto } from "../models/DebtType"
import { DebtService } from "../services/debtService"

type Props = {
  debtId: number
  onClose: () => void
  onSaved: () => void
}

export default function AddPaymentModal({
  debtId,
  onClose,
  onSaved,
}: Props) {

  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState("")

  const save = async () => {

    const dto: AddDebtPaymentDto = {
      debtId,
      amount,
      paymentDate: date,
    }

    await DebtService.payment(dto)

    onSaved()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-xl w-[400px] p-6 space-y-4">

        <h2 className="text-lg font-semibold">
          Add Payment
        </h2>


        {/* Amount */}

        <div>
          <label className="text-sm block mb-1">
            Amount
          </label>

          <input
            type="number"
            className="w-full h-12 px-3 rounded-xl border"
            value={amount}
            onChange={e =>
              setAmount(e.target.valueAsNumber)
            }
          />
        </div>


        {/* Date */}

        <div>
          <label className="text-sm block mb-1">
            Date
          </label>

          <input
            type="date"
            className="w-full h-12 px-3 rounded-xl border"
            value={date}
            onChange={e =>
              setDate(e.target.value)
            }
          />
        </div>


        {/* Buttons */}

        <div className="flex justify-end gap-2">

          <button
            className="px-4 py-2 rounded-xl border"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 rounded-xl bg-blue-600 text-white"
            onClick={save}
          >
            Save
          </button>

        </div>

      </div>

    </div>
  )
}