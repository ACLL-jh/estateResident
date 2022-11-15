import { Checkbox, Divider } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { useEffect, useState } from 'react';
import { MenuList } from './../apis/buiding/buiding';
import Upload from './../components/uplod/uplode';
const CheckboxGroup = Checkbox.Group;

const Home: React.FC<any> = (props: any) => {
  const { setImageUrl } = props;

  const [plainOptions, setplainOptions] = useState<any>([]);
  const [checkedList, setCheckedList] = useState<any>([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const { target } = e;
    console.log(e.target.value);
    MenuS.forEach((item: any) => {
      if (item.id == e.target.value) {
        if (e.target.checked == true) {
          item.checked = 1;
          item.children.forEach((check: any) => {
            check.checked = 1;
          });
        } else {
          item.checked = 0;
          item.children.forEach((check: any) => {
            check.checked = 0;
          });
        }
      }
    });

    const menuData = MenuS.filter((item: any) => {
      if (item.id === target.value) {
        if (e.target.checked == true) {
          item.checked = 1;
          item.children.forEach((check: any) => {
            check.checked = 1;
          });
        } else {
          item.checked = 0;
          item.children.forEach((check: any) => {
            check.checked = 0;
          });
        }
        item.checkS = item.children.map((sub: any) => sub.id);
        return item;
      }
    });
    console.log(MenuS);

    setMenuS(
      MenuS.map((item: any) =>
        item.id === target.value ? { ...item, checked: target.checked } : item
      )
    );
    if (target.checked) {
      setCheckedList([...new Set(checkedList.concat(menuData[0].checkS))]);
    } else {
      setCheckedList([
        ...new Set(
          checkedList.filter((item: any) => !menuData[0].checkS.includes(item))
        ),
      ]);
    }
  };
  const [MenuS, setMenuS] = useState<any>([]);
  const AdminroleList = async () => {
    const res: any = await MenuList({ page: 1, psize: 1000 });
    if (res.errCode == '10000') {
      setMenuS(res.data.list);
    }
  };
  useEffect(() => {
    AdminroleList();
  }, []);
  const onChangeCheck = (e: any, item: any) => {
    const { target } = e;
    MenuS.forEach((items: any) => {
      if (items.id == item.id) {
        items.children.forEach((item: any) => {
          if (item.id === target.value) {
            if (target.checked === true) {
              item.checked = 1;
            } else {
              item.checked = 0;
            }
          }
        });
        let checkeds = items.children.filter((cheS: any) => cheS.checked == 1);
        items.checked = checkeds.length === items.children.length ? 1 : 0;
        if (checkeds.length > 0 && items.checked != 1) {
          items.indeterminate = true;
        } else if (checkeds.length === 0 || items.checked == 1) {
          items.indeterminate = false;
        }
      }
    });
    if (target.checked) {
      setCheckedList([...new Set(checkedList.concat(target.value))]);
    } else {
      setCheckedList([
        ...new Set(checkedList.filter((item: any) => item !== target.value)),
      ]);
    }
    setMenuS(MenuS);
  };
  const [DataUrl, setDataUrl] = useState(
    'http://estate.eshareedu.cn/estate/api/upload/add'
  );
  const [urls, setUrl] = useState();

  useEffect(() => {
    console.log(urls);
  }, [urls]);

  return (
    <div>
      {MenuS.map((item: any, index: number) => (
        <div key={item.id}>
          <Checkbox
            indeterminate={item.indeterminate}
            onChange={onCheckAllChange}
            value={item.id}
            checked={item.checked}
          >
            {item.name}
          </Checkbox>
          <br />
          <CheckboxGroup style={{ marginLeft: '20px' }} value={checkedList}>
            {item.children.map((items: any) => (
              <Checkbox
                value={items.id}
                onChange={(e) => onChangeCheck(e, item)}
                key={items.id}
                // checked={items.checked}
              >
                {items.name}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      ))}
      <Upload actionUrl={DataUrl} setImageRPops={setUrl}></Upload>
      {urls}
    </div>
  );
};
export default Home;
