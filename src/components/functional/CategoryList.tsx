import React from "react";
import { RadioGroup, RadioGroupItem } from "src/components/ui/radio-group";
import { CategoryProps } from "src/types";
import { Label } from "../ui/label";
import { useCategory } from "src/stores/CategoryStore";

const CategoryList = ({
    currentType,
    onValueChange,
}: {
    currentType: "income" | "expense" | undefined;
    onValueChange: () => void;
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

    return (
        <RadioGroup onValueChange={onValueChange}>
            {currentType === "income"
                ? incomeCategories.map((category, index) => (
                      <div className="flex items-center" key={index}>
                          <RadioGroupItem
                              key={category.id}
                              id={category.id}
                              value={category.id}
                          />
                          <Label htmlFor={category.id}>
                              <img
                                  width={42}
                                  height={42}
                                  src={category.icon}
                                  alt={category.name + "icon"}
                              />
                          </Label>
                      </div>
                  ))
                : expenseCategories.map((category, index) => (
                      <div className="flex items-center" key={index}>
                          <RadioGroupItem
                              key={category.id}
                              id={category.id}
                              value={category.id}
                          />
                          <Label htmlFor={category.id}>
                              <img
                                  width={42}
                                  height={42}
                                  src={category.icon}
                                  alt={category.name + "icon"}
                              />
                          </Label>
                      </div>
                  ))}
        </RadioGroup>
    );
};

export default CategoryList;
