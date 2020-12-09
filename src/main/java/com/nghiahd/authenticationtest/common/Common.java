package com.nghiahd.authenticationtest.common;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;

import javax.persistence.Query;
import java.util.Map;
import java.util.Set;

public class Common {

    public static void setHeaders(HttpHeaders httpHeaders, Page<?> page){

        httpHeaders.add("Access-Control-Expose-Headers", "X-Total-Count");
        httpHeaders.add("X-Total-Count", Long.toString(page.getTotalElements()));

//        httpHeaders.add("Access-Control-Allow-Headers", "OPTIONS");
//        httpHeaders.add("Access-Control-Expose-Headers", "GET");

    }

    public static void setParamsWithPageable( Query query, Map<String, Object> params,  Pageable pageable,  Number total) {
        if (params != null && !params.isEmpty()) {
            Set<Map.Entry<String, Object>> set = params.entrySet();
            for (Map.Entry<String, Object> obj : set) {
                if(obj.getValue()!=null)
                query.setParameter(obj.getKey(), obj.getValue());
            }
        }
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());
    }

    public static void setParams( Query query, Map<String, Object> params) {
        if (params != null && !params.isEmpty()) {
            Set<Map.Entry<String, Object>> set = params.entrySet();
            for (Map.Entry<String, Object> obj : set) {
                if(obj.getValue()!=null)
                query.setParameter(obj.getKey(), obj.getValue());
            }
        }
    }
}
