import { categoryIconMap } from "../Icons/categoryIcons";

type Props = {
  value: string;
  onChange: (icon: string) => void;
};

export default function IconPicker({ value, onChange }: Props) {

  return (
    <div className="grid grid-cols-6 gap-2">

      {Object.entries(categoryIconMap).map(([name, Icon]) => (

        <button
          key={name}
          onClick={() => onChange(name)}
          className={`p-2 rounded-lg border ${
            value === name
              ? "border-primary"
              : "border-transparent"
          }`}
        >
          <Icon size={16} />
        </button>

      ))}

    </div>
  );
}