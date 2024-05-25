import { useQuery } from "@tanstack/react-query"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { User } from "@/types"
import UserService from "../api/users"
import { EditUser } from "./editUser"
import { DeleteUser } from "./deleteUser"

export function UserTable() {
  const { data: users } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: UserService.getAll
  })
  return (
    <div>
      <Table className="">
        <TableCaption>A list of your User.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="text-left">{user.fullName}</TableCell>
              <TableCell className="text-left">{user.email}</TableCell>
              <TableCell className="text-left">{user.role}</TableCell>
              <TableCell className="flex justify-around">
                <EditUser user={user} />
                <DeleteUser user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
