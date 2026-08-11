interface CartSelectionProps {

    checked: boolean;

    disabled?: boolean;

    onChange: (
        checked: boolean
    ) => void;

}

function CartSelection({

    checked,

    disabled = false,

    onChange,

}: CartSelectionProps) {

    return (

        <label className="flex items-center gap-3">

            <input

                type="checkbox"

                checked={checked}

                disabled={disabled}

                onChange={(event) =>

                    onChange(
                        event.target.checked
                    )

                }

                className="h-5 w-5 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"

            />

            <span className="text-sm font-medium text-slate-700">

                Select for payment

            </span>

        </label>

    );

}

export default CartSelection;