import {
  Badge,
  Button,
  Card,
  Empty,
  Flex,
  Input,
  Layout,
  Modal,
  Progress,
  Segmented,
  Typography,
} from "antd";
import { useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { alertsweet, confirmdelete } from "../sweetalert";
import toast, { Toaster } from "react-hot-toast";
import "./task.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import {
  addCategory,
  deleteCategory,
  selectCategory,
  addTask,
  deleteTask,
  updateTask,
  type Task,
  type Category,
  updateCategory,
} from "../redux/taskSlice";
import TextArea from "antd/es/input/TextArea";

export default function Todolistcomponent() {
  const dispatch = useDispatch<AppDispatch>();

  const category = useSelector((state: RootState) => state.task.categories);
  const selectedCategory = useSelector(
    (state: RootState) => state.task.selectedCategory
  );
  const theme = useSelector((state: RootState) => state.theme.mode);

  const task =
    category.find((item: Category) => item.label === selectedCategory)?.task ||
    [];

  const [categorymodal, setcategorymodal] = useState<boolean>(false);
  const [taskmodal, settaskmodal] = useState<boolean>(false);
  const [usetype, setusetype] = useState<number>(0);
  const [editindex, seteditindex] = useState<number>(0);

  const [categoryname, setcategoryname] = useState<string>("");
  const [tasktitle, settasktitle] = useState<string>("");
  const [taskdescription, settaskdescription] = useState<string>("");
  const [taskprogress, settaskprogress] = useState<number>(0);

  const checkempty = (name: string): boolean => name === "" || name.length <= 0;

  const categorylist = category.map((item: Category) => ({
    label: (
      <Badge count={item.count <= 99 ? item.count : "99+"}>{item.label}</Badge>
    ),
    value: item.label,
  }));

  const createcategory = () => {
    const check: boolean = category.some(
      (item: Category) => item.label === categoryname
    );
    if (usetype === 0 && (check || checkempty(categoryname))) {
      alertsweet(
        check
          ? "This category name has been used."
          : "Please fill category name"
      );
    } else {
      if (usetype === 0) {
        dispatch(addCategory(categoryname));
        createcategorysuccess();
      } else {
        if (checkempty(categoryname)) {
          alertsweet("Please fill category name.");
        } else {
          dispatch(updateCategory(categoryname));
          createcategorysuccess();
        }
      }
    }
  };

  const selectcategory = (val: string) => {
    dispatch(selectCategory(val));
  };

  const opencategorymodal = (usetype: number) => {
    setusetype(usetype);
    setcategorymodal(true);
    if (usetype === 1) {
      setcategoryname(selectedCategory);
    }
  };

  const opentaskmodal = (usetype: number, data: Task, index: number) => {
    setusetype(usetype);
    settaskmodal(true);
    if (usetype === 1) {
      settasktitle(data.title);
      settaskdescription(data.description);
      settaskprogress(data.progress);
      seteditindex(index);
    }
  };

  const createtask = () => {
    const checkname: boolean = task.some(
      (item: Task) => item.title === tasktitle
    );
    const checkprogress: boolean = taskprogress > 100;

    if (usetype === 0 && (checkname || checkprogress)) {
      if (checkempty(tasktitle)) {
        alertsweet("Please fill task name.");
      } else {
        alertsweet(
          checkname
            ? "This task name has been used."
            : "Progress must not over 100."
        );
      }
    } else {
      if (usetype === 0) {
        const newtask: Task = {
          title: tasktitle,
          description: taskdescription,
          progress: Number(taskprogress),
        };
        dispatch(addTask(newtask));
        createtasksuccess();
      } else {
        if (checkprogress || checkempty(tasktitle)) {
          alertsweet(
            checkprogress
              ? "Progress must not over 100."
              : "Please fill task name."
          );
        } else {
          dispatch(
            updateTask({
              index: editindex,
              task: {
                title: tasktitle,
                description: taskdescription,
                progress: Number(taskprogress),
              },
            })
          );
          createtasksuccess();
        }
      }
    }
  };

  const createtasksuccess = () => {
    toast.success(usetype === 0 ? "Task created." : "Task updated.");
    settasktitle("");
    settaskdescription("");
    settaskprogress(0);
    settaskmodal(false);
  };

  const createcategorysuccess = () => {
    toast.success(usetype === 0 ? "Category created." : "Category updated.");
    setcategoryname("");
    setcategorymodal(false);
  };

  const deletetcategory = () => {
    dispatch(deleteCategory(selectedCategory));
    toast.success("Delete category complete.");
  };

  const deletetask = (index: number) => {
    dispatch(deleteTask(index));
    toast.success("Delete task complete.");
  };

  return (
    <>
      <Layout>
        <Layout.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "fit-content",
            padding: "15px 10px 10px 10px",
            background: theme === "light" ? "white" : "",
          }}
          className="overflow-x-auto overflow-y-hidden gap-4"
        >
          <Segmented
            options={categorylist}
            value={selectedCategory}
            onChange={(v) => selectcategory(v)}
          />
          <Button
            style={{ minWidth: "32px" }}
            onClick={() => opencategorymodal(0)}
            icon={<PlusOutlined />}
          />
        </Layout.Header>
        <Layout.Content style={{ height: "calc(100vh - 109px)" }}>
          <Flex
            gap={5}
            justify="space-between"
            style={{ margin: "10px" }}
            className="overflow-auto"
          >
            <Flex gap={5}>
              <Button onClick={() => opencategorymodal(1)}>
                Edit category <EditOutlined />
              </Button>
              {category.length > 1 && (
                <Button
                  onClick={() =>
                    confirmdelete(" category : " + selectedCategory, () =>
                      deletetcategory()
                    )
                  }
                >
                  Delete category <DeleteOutlined />
                </Button>
              )}
            </Flex>
            {task.length > 0 && (
              <Button
                onClick={() =>
                  opentaskmodal(
                    0,
                    {
                      title: "",
                      description: "",
                      progress: 0,
                    },
                    0
                  )
                }
              >
                Create task <PlusOutlined />
              </Button>
            )}
          </Flex>
          {task.length <= 0 ? (
            <Empty
              style={{
                height: "100%",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
              description={"Task not found."}
            >
              <Button
                onClick={() =>
                  opentaskmodal(
                    0,
                    {
                      title: "",
                      description: "",
                      progress: 0,
                    },
                    0
                  )
                }
              >
                Create task
              </Button>
            </Empty>
          ) : (
              <Flex
                gap={10}
                wrap
                justify="center"
                className="overflow-auto"
                style={{ maxHeight: "calc(100vh - 140px)" }}
              >
                {task.map((item: Task, index: number) => (
                  <Card
                    key={index}
                    title={item.title}
                    extra={
                      <Flex gap={1}>
                        <Button
                          onClick={() =>
                            confirmdelete(" task : " + item.title, () =>
                              deletetask(index)
                            )
                          }
                          icon={<DeleteOutlined />}
                        ></Button>
                        <Button
                          onClick={() => opentaskmodal(1, item, index)}
                          icon={<EditOutlined />}
                        ></Button>
                      </Flex>
                    }
                    style={{ width: 300 }}
                  >
                    <Typography.Text>{item.description}</Typography.Text>
                    <Progress percent={item.progress} />
                  </Card>
                ))}
              </Flex>
          )}
        </Layout.Content>
      </Layout>

      <Modal
        title={usetype === 0 ? "Create category" : "Update category"}
        open={categorymodal}
        onOk={createcategory}
        onCancel={() => setcategorymodal(false)}
      >
        <Typography.Text>Name : </Typography.Text>
        <Input
          showCount
          maxLength={40}
          style={{ marginTop: 5 }}
          type="text"
          onChange={(e) => setcategoryname(e.target.value)}
          value={categoryname}
        ></Input>
      </Modal>
      <Toaster />

      <Modal
        title={usetype === 0 ? "Create Task" : "Update Task"}
        open={taskmodal}
        onOk={createtask}
        onCancel={() => settaskmodal(false)}
      >
        <Typography.Text>Name : </Typography.Text>
        <Input
          showCount
          maxLength={40}
          style={{ marginTop: 5, marginBottom: 10 }}
          type="text"
          onChange={(e) => settasktitle(e.target.value)}
          value={tasktitle}
        ></Input>
        <Typography.Text>Description : </Typography.Text>
        <TextArea
          showCount
          maxLength={80}
          style={{ marginTop: 5, marginBottom: 20 }}
          onChange={(e) => settaskdescription(e.target.value)}
          value={taskdescription}
        ></TextArea>
        {usetype === 1 && (
          <>
            <Typography.Text>Progress : </Typography.Text>
            <Input
              style={{ marginTop: 5, marginBottom: 10 }}
              type="number"
              max={100}
              onChange={(e) => settaskprogress(Number(e.target.value))}
              value={taskprogress}
            ></Input>
          </>
        )}
      </Modal>
      <Toaster />
    </>
  );
}
