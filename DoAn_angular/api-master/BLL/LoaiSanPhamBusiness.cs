﻿using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public partial class LoaiSanPhamBusiness : ILoaiSanPhamBusiness
    {
        private ILoaiSanPhamRepository _res;
        public LoaiSanPhamBusiness(ILoaiSanPhamRepository ItemGroupRes)
        {
            _res = ItemGroupRes;
        }
        
        public List<LoaiSanPhamModel> GetData()
        {
            var allItemGroups = _res.GetData();
            var lstParent = allItemGroups.Where(ds => ds.parent_item_group_id == null).OrderBy(s => s.seq_num).ToList();
            foreach (var item in lstParent)
            {
                item.children = GetHiearchyList(allItemGroups, item);
            }
            return lstParent;
        }
        public List<LoaiSanPhamModel> GetHiearchyList(List<LoaiSanPhamModel> lstAll, LoaiSanPhamModel node)
        {
            var lstChilds = lstAll.Where(ds => ds.parent_item_group_id == node.item_group_id).ToList();
            if (lstChilds.Count == 0)
                return null;
            for (int i = 0; i < lstChilds.Count; i++)
            {
                var childs = GetHiearchyList(lstAll, lstChilds[i]);
                lstChilds[i].type = (childs == null || childs.Count == 0) ? "leaf" : "";
                lstChilds[i].children = childs;
            }
            return lstChilds.OrderBy(s => s.seq_num).ToList();
        }
        
    }

}
