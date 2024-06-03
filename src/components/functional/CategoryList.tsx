import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "src/components/ui/radio-group";
import { CategoryProps } from "src/types";
import { Label } from "../ui/label";
import { useCategory } from "src/stores/CategoryStore";

const CategoryList = ({
    currentType,
    onValueChange,
    defaultCategory,
}: {
    currentType: "income" | "expense" | undefined;
    defaultCategory?: string;
    onValueChange: (value: string) => void;
}) => {
    const categories: CategoryProps[] = useCategory(
        (state) => state.categories
    );

    const incomeCategories = React.useMemo(() => {
        return categories.filter((category) => category.type === "income");
    }, [categories]);

    const expenseCategories = React.useMemo(() => {
        return categories.filter((category) => category.type === "expense");
    }, [categories]);

    const [selectedOption, setSelectedOption] = useState<string>(
        defaultCategory || ""
    );

    return (
        <RadioGroup
            onValueChange={(value) => {
                onValueChange(value);
                setSelectedOption(value);
            }}
            className="w-full flex items-center justify-start"
        >
            {currentType === "income"
                ? incomeCategories.map((category, index) => (
                      <div key={index} className="px-2">
                          <RadioGroupItem
                              key={category.id}
                              id={category.id}
                              value={category.id}
                              className="hidden"
                          />
                          <Label htmlFor={category.id}>
                              <img
                                  width={42}
                                  height={42}
                                  src={category.icon}
                                  alt={category.name + "icon"}
                                  className={
                                      "hover:cursor-pointer" +
                                      (selectedOption === category.id
                                          ? " border-2 border-blue-700 rounded-lg "
                                          : "")
                                  }
                              />
                          </Label>
                      </div>
                  ))
                : expenseCategories.map((category, index) => (
                      <div key={index} className="px-2">
                          <RadioGroupItem
                              key={category.id}
                              id={category.id}
                              value={category.id}
                              className="hidden"
                          />
                          <Label htmlFor={category.id}>
                              <img
                                  width={42}
                                  height={42}
                                  src={category.icon}
                                  alt={category.name + "icon"}
                                  className={
                                      "hover:cursor-pointer" +
                                      (selectedOption === category.id
                                          ? " border-2 border-blue-700 rounded-lg"
                                          : "")
                                  }
                              />
                          </Label>
                      </div>
                  ))}
        </RadioGroup>
    );
};

export default CategoryList;
