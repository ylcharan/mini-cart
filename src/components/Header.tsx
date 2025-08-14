import { UserRound } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("user");

  const handleCategoryChange = (value: "admin" | "user") => {
    setCategory(value);
    navigate(`/${value}`); // Navigate immediately when value changes
  };

  return (
    <div className="flex items-center justify-between py-4">
      <h1
        onClick={() => navigate("/user")}
        className="text-2xl font-bold uppercase cursor-pointer"
      >
        MiniCart
      </h1>

      <div className="flex gap-4 items-center justify-between">
        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder={category} />
          </SelectTrigger>
          <SelectContent onChange={() => navigate(`/${category}`)}>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
        <UserRound className="cursor-pointer" />
      </div>
    </div>
  );
};
export default Header;
