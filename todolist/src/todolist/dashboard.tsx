import {
  Button,
  Card,
  Empty,
  Flex,
  Layout,
  Progress,
  Typography,
  type ProgressProps,
} from "antd";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { Category, Task } from "../redux/taskSlice";

export default function Dashboardcomponent() {
  const category: Category[] = useSelector(
    (state: RootState) => state.task.categories
  );
  const tasks: Task[] = category.flatMap((item: Category) => item.task);
  const tasksnotstart: Task[] =
    tasks.filter((item) => item.progress === 0) || [];
  const tasksondue: Task[] =
    tasks.filter((item) => item.progress > 0 && item.progress < 99) || [];
  const taskscomplete: Task[] =
    tasks.filter((item) => item.progress === 100) || [];

  const conicColors: ProgressProps["strokeColor"] = {
    "0%": "#87d068",
    "50%": "#ffe58f",
    "100%": "#ffccc7",
  };

  return tasks.length <= 0 ? (
    <Empty
      style={{
        height: "100%",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
      description={<Typography.Text>Task Notfound!</Typography.Text>}
    >
      <a href="/todolist">
        <Button type="primary">Todolist page </Button>
      </a>
    </Empty>
  ) : (
    <Layout
      className="h-full overflow-auto"
      style={{ margin: "20px", maxHeight: "calc(100vh - 40px)" }}
    >
      <Flex gap={10} className="h-full" justify="space-around" wrap>
        <Flex
          vertical
          gap={5}
          className="h-fit"
          style={{ margin: "auto 0px auto 0px" }}
        >
          <Flex gap={5} justify="space-between" className="text-end">
            <Typography.Title type="warning" level={1}>
              Not finish <br /> task :
            </Typography.Title>
            <Progress
              strokeColor={conicColors}
              format={(percent) => `${percent}`}
              type="circle"
              percent={tasksnotstart.length + tasksondue.length}
            />
          </Flex>
          <Flex gap={5} justify="space-between" className="text-end">
            <Typography.Title type="success" level={1}>
              Finished <br /> task :
            </Typography.Title>
            <Progress
              strokeColor={conicColors}
              format={(percent) => `${percent}`}
              type="circle"
              percent={taskscomplete.length}
            />
          </Flex>
          <Flex gap={5} justify="space-between" className="text-end">
            <Typography.Title type="secondary" level={1}>
              Summary <br />
              task :
            </Typography.Title>
            <Progress
              strokeColor={conicColors}
              format={(percent) => `${percent}`}
              type="circle"
              percent={
                tasksnotstart.length + tasksondue.length + taskscomplete.length
              }
            />
          </Flex>
        </Flex>
        <Flex justify="center" gap={10} wrap>
          {tasksnotstart.length > 0 && (
            <Flex vertical gap={10} className=" h-fit" align="center">
              <Typography.Title level={2}>Not start</Typography.Title>
              <Progress
                type="circle"
                strokeColor="grey"
                percent={Math.round(
                  (tasksnotstart.length / tasks.length) * 100
                )}
                status="normal"
              />
              <Flex
                vertical
                gap={5}
                align="center"
                className="overflow-auto"
                
              >
                {tasksnotstart.length > 0 &&
                  tasksnotstart.map(
                    (item, index) =>
                      item.progress === 0 && (
                        <Card
                          key={index}
                          title={item.title}
                          style={{ width: 300 }}
                        >
                          <Typography.Text>{item.description}</Typography.Text>
                        </Card>
                      )
                  )}
              </Flex>
            </Flex>
          )}
          {tasksondue.length > 0 && (
            <Flex vertical gap={10} className=" h-fit" align="center">
              <Typography.Title level={2}>Ondue</Typography.Title>
              <Progress
                type="circle"
                percent={Math.round((tasksondue.length / tasks.length) * 100)}
                status="normal"
              />
              <Flex
                vertical
                gap={5}
                align="center"
                className="overflow-auto"
                
              >
                {tasksondue.map(
                  (item, index) =>
                    item.progress > 0 &&
                    item.progress < 99 && (
                      <Card
                        key={index}
                        title={item.title}
                        style={{ width: 300 }}
                      >
                        <Typography.Text>{item.description}</Typography.Text>
                      </Card>
                    )
                )}
              </Flex>
            </Flex>
          )}
          {taskscomplete.length > 0 && (
            <Flex vertical gap={10} className=" h-fit" align="center">
              <Typography.Title level={2}>Success</Typography.Title>
              <Progress
                type="circle"
                strokeColor="green"
                percent={Math.round(
                  (taskscomplete.length / tasks.length) * 100
                )}
                status="normal"
              />
              <Flex
                vertical
                gap={5}
                align="center"
                className="overflow-auto"
                
              >
                {taskscomplete.map(
                  (item, index) =>
                    item.progress === 100 && (
                      <Card
                        key={index}
                        title={item.title}
                        style={{ width: 300 }}
                      >
                        <Typography.Text>{item.description}</Typography.Text>
                      </Card>
                    )
                )}
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Layout>
  );
}
