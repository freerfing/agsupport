package com.augurit.gzsw.domain;

import java.util.List;

/**
 * <b><code>OrgTree</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/19 17:44.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
/*
用于构建树
 */
public class Tree<T> {
    private T self;
    private List<Tree> children;

    public T getSelf() {
        return self;
    }

    public void setSelf(T self) {
        this.self = self;
    }

    public List<Tree> getChildren() {
        return children;
    }

    public void setChildren(List<Tree> children) {
        this.children = children;
    }
}
