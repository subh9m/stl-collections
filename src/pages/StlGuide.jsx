import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

// --- Data (Moved from original script) ---

const ICONS = {
    overview: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v-2H6.5A2.5 2.5 0 0 1 4 12.5v-1A2.5 2.5 0 0 1 6.5 9H20V7H6.5A2.5 2.5 0 0 1 4 4.5v-1" /></svg>`,
    vector: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="10" rx="2" ry="2"/><line x1="6" y1="2" x2="6" y2="7"/><line x1="18" y1="2" x2="18" y2="7"/></svg>`,
    list: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h10M8 12h10M8 18h10M4 6h.01M4 12h.01M4 18h.01"/></svg>`,
    deque: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/><polyline points="9 18 3 12 9 6"/></svg>`,
    array: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
    forward_list: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/><line x1="5" y1="12" x2="15" y2="12"/></svg>`,
    set: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22V10M12 10l-4-4 4-4 4 4-4 4zM20 18h-8"/></svg>`,
    multiset: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22V10M12 10l-4-4 4-4 4 4-4 4zM20 18h-8M20 14h-8"/></svg>`,
    map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    multimap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle><path d="M19 12h4"/></svg>`,
    unordered: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h20M7 2l5 10-5 10M17 2l-5 10 5 10"/></svg>`,
    stack: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 18h16M4 14h16M4 10h16M4 6h16"/></svg>`,
    queue: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16m-4-4l4 4-4 4M4 6h16M4 18h16"/></svg>`,
    priority_queue: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    algorithms: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    summary: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>`,
    quick_ref: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
    count: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
    loop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
    transform: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L12 22M22 12L2 12"/><path d="M17.5 7.5L12 2L6.5 7.5"/><path d="M7.5 16.5L12 22L16.5 16.5"/></svg>`,
    copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
    remove: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
    sort: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 4h18M3 8h12M3 12h8M3 16h4M3 20h2"/></svg>`,
    bounds: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>`,
    numeric: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10V4h-5"/><path d="M4 20h16"/><path d="M6 14h2"/><path d="M10 14h2"/><path d="M14 14h2"/><path d="M6 10h12"/></svg>`,
    string: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>`,
};

const pageData = [
    { id: "overview", title: "Overview", icon: ICONS.overview },
    {
        id: "algorithms", title: "STL Algorithms", icon: ICONS.algorithms,
        isExternal: true, // Mark this as an external link
        href: 'algorithms.html' // Note: This will link to a non-existent page in this demo
    },
    {
        id: "vector", title: "Vector", icon: ICONS.vector,
        declarations: `// Default (empty vector)\nvector<int> v1;\n\n// With initial size and value\nvector<int> v2(5, 10); // 5 integers with value 10\n\n// From an initializer list (C++11)\nvector<string> v3 = {"apple", "banana", "cherry"};\n\n// From another vector (copy)\nvector<string> v4(v3);\n\n// From a range of iterators\nvector<int> v5(v2.begin(), v2.begin() + 3); // {10, 10, 10}`,
        structure: `<ul><li><strong>Storage:</strong> Contiguous memory array (like C array)</li><li><strong>Element Order:</strong> Elements maintain insertion order</li><li><strong>Memory Layout:</strong> All elements stored consecutively in memory</li><li><strong>Growth:</strong> When capacity exceeded, allocates new larger array and copies all elements</li><li><strong>Access Pattern:</strong> Random access via index in O(1) time</li><li><strong>Cache Performance:</strong> Excellent due to memory locality</li></ul>`,
        functions: `<tr><td>assign</td><td>Assigns new content to vector</td><td><code>assign(count, value)</code></td></tr><tr><td>at</td><td>Access element with bounds checking</td><td><code>at(index)</code></td></tr><tr><td>back</td><td>Access last element</td><td><code>back()</code></td></tr><tr><td>capacity</td><td>Return size of allocated storage capacity</td><td><code>capacity()</code></td></tr><tr><td>clear</td><td>Clear all elements</td><td><code>clear()</code></td></tr><tr><td>data</td><td>Access underlying array</td><td><code>data()</code></td></tr><tr><td>emplace</td><td>Construct and insert element</td><td><code>emplace(iterator, args...)</code></td></tr><tr><td>emplace_back</td><td>Construct and insert element at end</td><td><code>emplace_back(args...)</code></td></tr><tr><td>empty</td><td>Test whether vector is empty</td><td><code>empty()</code></td></tr><tr><td>erase</td><td>Erase elements</td><td><code>erase(iterator)</code></td></tr><tr><td>front</td><td>Access first element</td><td><code>front()</code></td></tr><tr><td>insert</td><td>Insert elements</td><td><code>insert(iterator, value)</code></td></tr><tr><td>pop_back</td><td>Delete last element</td><td><code>pop_back()</code></td></tr><tr><td>push_back</td><td>Add element at the end</td><td><code>push_back(value)</code></td></tr><tr><td>reserve</td><td>Request a change in capacity</td><td><code>reserve(n)</code></td></tr><tr><td>resize</td><td>Change size</td><td><code>resize(n, val)</code></td></tr><tr><td>shrink_to_fit</td><td>Shrink to fit</td><td><code>shrink_to_fit()</code></td></tr><tr><td>size</td><td>Return size</td><td><code>size()</code></td></tr><tr><td>swap</td><td>Swap content</td><td><code>swap(other)</code></td></tr>`,
        algorithms: [
            { name: 'find / find_if', icon: ICONS.search, description: 'Finds the first element matching a value or predicate.' },
            { name: 'count / count_if', icon: ICONS.count, description: 'Counts occurrences of a value or predicate match.' },
            { name: 'for_each', icon: ICONS.loop, description: 'Applies a function to each element.' },
            { name: 'transform', icon: ICONS.transform, description: 'Applies an operation and stores the result.' },
            { name: 'copy / move', icon: ICONS.copy, description: 'Copies or moves elements between ranges.' },
            { name: 'remove / remove_if', icon: ICONS.remove, description: 'Use with <code>.erase()</code> to remove elements.' },
            { name: 'replace / replace_if', icon: ICONS.loop, description: 'Replaces elements matching a value or predicate.' },
            { name: 'reverse / rotate / shuffle', icon: ICONS.loop, description: 'Changes element order.' },
            { name: 'sort / stable_sort', icon: ICONS.sort, description: 'Sorts a range.' },
            { name: 'binary_search', icon: ICONS.search, description: 'Efficiently checks for a value in a sorted range.' },
            { name: 'lower_bound / upper_bound', icon: ICONS.bounds, description: 'Finds insertion points in a sorted range.' },
            { name: 'accumulate', icon: ICONS.numeric, description: 'Sums up elements in a range.' },
            { name: 'iota', icon: ICONS.numeric, description: 'Fills a range with an increasing sequence.' },
        ]
    },
    {
        id: "string-functions", title: "String Functions", icon: ICONS.string,
        isExternal: true,
        href: 'string_functions.html' // Note: This will link to a non-existent page in this demo
    },
    {
        id: "list", title: "List", icon: ICONS.list,
        declarations: `// Default (empty list)\nlist<int> l1;\n\n// With initial size and value\nlist<int> l2(4, 100); // 4 integers with value 100\n\n// From an initializer list (C++11)\nlist<string> l3 = {"cat", "dog", "mouse"};\n\n// From another list (copy)\nlist<string> l4(l3);`,
        structure: `<ul><li><strong>Storage:</strong> Doubly-linked list of nodes</li><li><strong>Element Order:</strong> Elements maintain insertion order</li><li><strong>Memory Layout:</strong> Each element stored in separate node with pointers to previous/next</li><li><strong>Access Pattern:</strong> Sequential access only, O(n) to reach specific position</li><li><strong>Cache Performance:</strong> Poor due to non-contiguous memory allocation</li><li><strong>Special Operations:</strong> Efficient splice, merge, sort operations</li></ul>`,
        functions: `<tr><td>assign</td><td>Assigns new content to list</td><td><code>assign(count, value)</code></td></tr><tr><td>back</td><td>Access last element</td><td><code>back()</code></td></tr><tr><td>clear</td><td>Clear all elements</td><td><code>clear()</code></td></tr><tr><td>emplace_back</td><td>Construct and insert element at end</td><td><code>emplace_back(args...)</code></td></tr><tr><td>emplace_front</td><td>Construct and insert element at beginning</td><td><code>emplace_front(args...)</code></td></tr><tr><td>empty</td><td>Test whether list is empty</td><td><code>empty()</code></td></tr><tr><td>erase</td><td>Erase elements</td><td><code>erase(iterator)</code></td></tr><tr><td>front</td><td>Access first element</td><td><code>front()</code></td></tr><tr><td>insert</td><td>Insert elements</td><td><code>insert(iterator, value)</code></td></tr><tr><td>merge</td><td>Merge sorted lists</td><td><code>merge(other)</code></td></tr><tr><td>pop_back</td><td>Delete last element</td><td><code>pop_back()</code></td></tr><tr><td>pop_front</td><td>Delete first element</td><td><code>pop_front()</code></td></tr><tr><td>push_back</td><td>Add element at the end</td><td><code>push_back(value)</code></td></tr><tr><td>push_front</td><td>Add element at the beginning</td><td><code>push_front(value)</code></td></tr><tr><td>remove</td><td>Remove elements with specific value</td><td><code>remove(value)</code></td></tr><tr><td>remove_if</td><td>Remove elements satisfying condition</td><td><code>remove_if(predicate)</code></td></tr><tr><td>reverse</td><td>Reverse the order of elements</td><td><code>reverse()</code></td></tr><tr><td>sort</td><td>Sort elements</td><td><code>sort()</code></td></tr><tr><td>splice</td><td>Transfer elements from list to list</td><td><code>splice(iterator, other)</code></td></tr><tr><td>unique</td><td>Remove duplicate values</td><td><code>unique()</code></td></tr>`,
        algorithms: `<div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-7 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1"><p>List supports algorithms that work with bidirectional iterators (<code>find</code>,  <code>for_each</code>, <code>reverse</code>). It does not support algorithms requiring random access (like <code>sort</code>), but provides its own highly optimized member functions (e.g., <code>list::sort</code>) for these tasks.</p></div>`
    },
    {
        id: "deque", title: "Deque", icon: ICONS.deque,
        declarations: `// Default (empty deque)\ndeque<int> d1;\n\n// With initial size and value\ndeque<int> d2(3, 42); // 3 integers with value 42\n\n// From an initializer list (C++11)\ndeque<char> d3 = {'a', 'b', 'c'};\n\n// From another deque (copy)\ndeque<char> d4(d3);`,
        structure: `<ul><li><strong>Storage:</strong> Double-ended queue using segmented array (chunks of contiguous memory)</li><li><strong>Element Order:</strong> Elements maintain insertion order</li><li><strong>Memory Layout:</strong> Map of fixed-size arrays</li><li><strong>Access Pattern:</strong> Random access in O(1) via chunk calculation</li><li><strong>Cache Performance:</strong> Good for sequential access, moderate for random access</li></ul>`,
        functions: `<tr><td>assign</td><td>Assigns new content to deque</td><td><code>assign(count, value)</code></td></tr><tr><td>at</td><td>Access element with bounds checking</td><td><code>at(index)</code></td></tr><tr><td>back</td><td>Access last element</td><td><code>back()</code></td></tr><tr><td>clear</td><td>Clear all elements</td><td><code>clear()</code></td></tr><tr><td>emplace_back</td><td>Construct and insert element at end</td><td><code>emplace_back(args...)</code></td></tr><tr><td>emplace_front</td><td>Construct and insert element at beginning</td><td><code>emplace_front(args...)</code></td></tr><tr><td>empty</td><td>Test whether deque is empty</td><td><code>empty()</code></td></tr><tr><td>erase</td><td>Erase elements</td><td><code>erase(iterator)</code></td></tr><tr><td>front</td><td>Access first element</td><td><code>front()</code></td></tr><tr><td>pop_back</td><td>Delete last element</td><td><code>pop_back()</code></td></tr><tr><td>pop_front</td><td>Delete first element</td><td><code>pop_front()</code></td></tr><tr><td>push_back</td><td>Add element at the end</td><td><code>push_back(value)</code></td></tr><tr><td>push_front</td><td>Add element at the beginning</td><td><code>push_front(value)</code></td></tr>`,
        algorithms: `<div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-7 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1"><p>Deque supports all STL algorithms that vector supports since it provides random access iterators. All algorithms from the vector section apply with identical syntax.</p></div>`
    },
    {
        id: "array", title: "Array", icon: ICONS.array,
        declarations: `// Size must be a compile-time constant\n// Aggregate initialization\narray<int, 5> a1 = {1, 2, 3, 4, 5};\n\n// Uniform initialization (C++11)\narray<string, 3> a2 = {"one", "two", "three"};\n\n// Zero-initialization\narray<int, 4> a3 = {}; // {0, 0, 0, 0}`,
        structure: `<ul><li><strong>Storage:</strong> Fixed-size contiguous memory array (stack allocated)</li><li><strong>Element Order:</strong> Elements maintain insertion/assignment order</li><li><strong>Size:</strong> Fixed at compile-time, cannot grow or shrink</li><li><strong>Access Pattern:</strong> Random access via index in O(1) time</li><li><strong>Cache Performance:</strong> Excellent due to memory locality</li></ul>`,
        functions: `<tr><td>at</td><td>Access element with bounds checking</td><td><code>at(index)</code></td></tr><tr><td>back</td><td>Access last element</td><td><code>back()</code></td></tr><tr><td>data</td><td>Access underlying array</td><td><code>data()</code></td></tr><tr><td>empty</td><td>Test whether array is empty</td><td><code>empty()</code></td></tr><tr><td>fill</td><td>Fill array with value</td><td><code>fill(value)</code></td></tr><tr><td>front</td><td>Access first element</td><td><code>front()</code></td></tr><tr><td>max_size</td><td>Return maximum size</td><td><code>max_size()</code></td></tr><tr><td>operator[]</td><td>Access element</td><td><code>a[index]</code></td></tr><tr><td>size</td><td>Return size</td><td><code>size()</code></td></tr><tr><td>swap</td><td>Swap content</td><td><code>swap(other)</code></td></tr>`,
        algorithms: `<div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-7 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1"><p>Array supports all STL algorithms that vector supports since it provides random access iterators. All algorithms from the vector section apply with identical syntax.</p></div>`
    },
    {
        id: "forward-list", title: "Forward List", icon: ICONS.forward_list,
        declarations: `// Default (empty forward_list)\nforward_list<int> fl1;\n\n// From an initializer list (C++11)\nforward_list<double> fl2 = {3.14, 1.618, 2.718};\n\n// With initial size and value\nforward_list<int> fl3(5, 10); // 5 integers with value 10\n\n// From another forward_list (copy)\nforward_list<double> fl4(fl2);`,
        structure: `<ul><li><strong>Storage:</strong> Singly-linked list of nodes (forward pointers only)</li><li><strong>Memory Layout:</strong> Each element in separate node with pointer to next only</li><li><strong>Access Pattern:</strong> Forward sequential access only, O(n) to reach position</li><li><strong>Cache Performance:</strong> Poor due to non-contiguous memory allocation</li></ul>`,
        functions: `<tr><td>assign</td><td>Assign new content</td><td><code>assign(count, value)</code></td></tr><tr><td>before_begin</td><td>Return iterator to before beginning</td><td><code>before_begin()</code></td></tr><tr><td>clear</td><td>Clear all elements</td><td><code>clear()</code></td></tr><tr><td>emplace_after</td><td>Construct and insert element after position</td><td><code>emplace_after(it, args...)</code></td></tr><tr><td>emplace_front</td><td>Construct and insert element at beginning</td><td><code>emplace_front(args...)</code></td></tr><tr><td>erase_after</td><td>Erase element after position</td><td><code>erase_after(it)</code></td></tr><tr><td>front</td><td>Access first element</td><td><code>front()</code></td></tr><tr><td>insert_after</td><td>Insert elements after position</td><td><code>insert_after(it, value)</code></td></tr><tr><td>merge</td><td>Merge sorted forward_lists</td><td><code>merge(other)</code></td></tr><tr><td>pop_front</td><td>Delete first element</td><td><code>pop_front()</code></td></tr><tr><td>push_front</td><td>Add element at the beginning</td><td><code>push_front(value)</code></td></tr><tr><td>remove</td><td>Remove elements with specific value</td><td><code>remove(value)</code></td></tr><tr><td>reverse</td><td>Reverse the order of elements</td><td><code>reverse()</code></td></tr><tr><td>sort</td><td>Sort elements</td><td><code>sort()</code></td></tr><tr><td>splice_after</td><td>Transfer elements</td><td><code>splice_after(it, other)</code></td></tr><tr><td>unique</td><td>Remove duplicate values</td><td><code>unique()</code></td></tr>`,
        algorithms: `<div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-7 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1"><p>Forward list supports algorithms that work with forward iterators only, such as <code>find</code>, <code>count</code>, <code>for_each</code>, and <code>copy</code>.</p></div>`
    },
    {
        id: "set", title: "Set", icon: ICONS.set,
        declarations: `// Default (empty set, sorted with operator<)\nset<int> s1;\n\n// From an initializer list (duplicates ignored)\nset<int> s2 = {5, 2, 8, 2, 5}; // Contains {2, 5, 8}\n\n// With a custom comparator (sorted in descending order)\nset<int, greater<int>> s3 = {5, 2, 8}; // Contains {8, 5, 2}`,
        structure: `<ul><li><strong>Storage:</strong> Balanced binary search tree (usually Red-Black Tree)</li><li><strong>Element Order:</strong> Elements automatically sorted by key</li><li><strong>Access Pattern:</strong> Logarithmic search, insertion, deletion O(log n)</li><li><strong>Uniqueness:</strong> No duplicate elements allowed</li></ul>`,
        functions: `<tr><td>clear</td><td>Clear all elements</td><td><code>clear()</code></td></tr><tr><td>count</td><td>Count elements with specific key</td><td><code>count(key)</code></td></tr><tr><td>emplace</td><td>Construct and insert element</td><td><code>emplace(args...)</code></td></tr><tr><td>erase</td><td>Erase elements</td><td><code>erase(key)</code></td></tr><tr><td>find</td><td>Find element</td><td><code>find(key)</code></td></tr><tr><td>insert</td><td>Insert elements</td><td><code>insert(value)</code></td></tr><tr><td>lower_bound</td><td>Return iterator to lower bound</td><td><code>lower_bound(key)</code></td></tr><tr><td>upper_bound</td><td>Return iterator to upper bound</td><td><code>upper_bound(key)</code></td></tr>`,
        algorithms: `<div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-7 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1"><p>Prefer member functions like <code>find()</code> and <code>count()</code> over generic algorithms for better performance. Supports algorithms for sorted ranges like <code>set_union</code> and <code>set_intersection</code>.</p></div>`
    },
    {
        id: "multiset", title: "Multiset", icon: ICONS.multiset,
        declarations: `// Default (empty multiset)\nmultiset<int> ms1;\n\n// From an initializer list (duplicates are kept)\nmultiset<int> ms2 = {5, 2, 8, 2, 5}; // Contains {2, 2, 5, 5, 8}\n\n// With a custom comparator\nmultiset<int, greater<int>> ms3 = {5, 2, 8, 2}; // {8, 5, 2, 2}`,
        structure: `<ul><li><strong>Storage:</strong> Balanced binary search tree</li><li><strong>Element Order:</strong> Elements automatically sorted by key</li><li><strong>Uniqueness:</strong> Duplicate elements are allowed</li></ul>`,
        functions: `<tr><td>count</td><td>Count elements with specific key</td><td><code>count(key)</code></td></tr><tr><td>equal_range</td><td>Get range of equal elements</td><td><code>equal_range(key)</code></td></tr><tr><td>find</td><td>Find element</td><td><code>find(key)</code></td></tr><tr><td>insert</td><td>Insert elements</td><td><code>insert(value)</code></td></tr><tr><td>lower_bound</td><td>Return iterator to lower bound</td><td><code>lower_bound(key)</code></td></tr><tr><td>upper_bound</td><td>Return iterator to upper bound</td><td><code>upper_bound(key)</code></td></tr>`,
        algorithms: `<div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-7 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1"><p>Supports the same algorithms as <code>set</code>, but with duplicate key handling. <code>equal_range</code> is particularly useful.</p></div>`
    },
    {
        id: "unordered-set", title: "Unordered Set", icon: ICONS.unordered,
        declarations: `// Default (empty unordered_set)\nunordered_set<string> us1;\n\n// From an initializer list\nunordered_set<int> us2 = {10, 20, 5, 15, 10}; // {5, 10, 15, 20} (order not guaranteed)\n\n// --- Example with a custom type ---\n// 1. Define the custom type\nstruct Person {\n    string name;\n    int age;\n};\n\n// 2. Define an equality predicate\nstruct PersonEqual {\n    bool operator()(const Person& a, const Person& b) const {\n        return a.name == b.name && a.age == b.age;\n    }\n};\n\n// 3. Define a hash function\nstruct PersonHash {\n    size_t operator()(const Person& p) const {\n        // Combine hashes of members\n        size_t h1 = hash<string>()(p.name);\n        size_t h2 = hash<int>()(p.age);\n        return h1 ^ (h2 << 1); // A simple way to combine hashes\n    }\n};\n\n// 4. Declare the unordered_set using the custom types\nunordered_set<Person, PersonHash, PersonEqual> us3;\nus3.insert({"Alice", 25});\nus3.insert({"Bob", 30});`,
        structure: `<ul><li><strong>Storage:</strong> Hash table with separate chaining</li><li><strong>Element Order:</strong> No guaranteed order</li><li><strong>Access Pattern:</strong> Average O(1) for search/insert/delete</li><li><strong>Uniqueness:</strong> No duplicate elements allowed</li></ul>`,
        functions: `<tr><td>bucket_count</td><td>Return number of buckets</td><td><code>bucket_count()</code></td></tr><tr><td>count</td><td>Count elements with specific key</td><td><code>count(key)</code></td></tr><tr><td>find</td><td>Find element</td><td><code>find(key)</code></td></tr><tr><td>load_factor</td><td>Return load factor</td><td><code>load_factor()</code></td></tr><tr><td>rehash</td><td>Set number of buckets</td><td><code>rehash(count)</code></td></tr><tr><td>reserve</td><td>Request a capacity change</td><td><code>reserve(count)</code></td></tr>`,
        algorithms: `<div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-7 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1"><p>Limited algorithm support due to unordered nature. Always prefer member functions like <code>find()</code> and <code>count()</code> for performance.</p></div>`
    },
    {
        id: "map", title: "Map", icon: ICONS.map,
        declarations: `// Default (empty map)\nmap<string, int> m1;\n\n// From an initializer list of pairs (C++11)\nmap<string, int> m2 = {\n    {"Alice", 25},\n    {"Bob", 30}\n};\n\n// With a custom key comparator (sorted by string length)\nstruct CompareLength {\n    bool operator()(const string& a, const string& b) const {\n        return a.length() < b.length();\n    }\n};\nmap<string, int, CompareLength> m3 = {\n    {"one", 1},\n    {"three", 3},\n    {"two", 2}\n}; // m3 now contains: { {"one", 1}, {"two", 2}, {"three", 3} }`,
        structure: `<ul><li><strong>Storage:</strong> Balanced binary search tree of key-value pairs</li><li><strong>Element Order:</strong> Elements sorted by key</li><li><strong>Access Pattern:</strong> Logarithmic search, insertion, deletion O(log n)</li><li><strong>Uniqueness:</strong> Keys must be unique</li></ul>`,
        functions: `<tr><td>at</td><td>Access element with bounds checking</td><td><code>at(key)</code></td></tr><tr><td>count</td><td>Count elements with specific key</td><td><code>count(key)</code></td></tr><tr><td>emplace</td><td>Construct and insert element</td><td><code>emplace(args...)</code></td></tr><tr><td>find</td><td>Find element</td><td><code>find(key)</code></td></tr><tr><td>insert</td><td>Insert elements</td><td><code>insert({key, value})</code></td></tr><tr><td>operator[]</td><td>Access or insert element</td><td><code>m[key]</code></td></tr>`,
        algorithms: `<div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-7 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1"><p>Prefer member functions for key-based lookups. Generic algorithms like <code>for_each</code> can be used to iterate over key-value pairs.</p></div>`
    },
    {
        id: "multimap", title: "Multimap", icon: ICONS.multimap,
        declarations: `// Default (empty multimap)\nmultimap<char, int> mm1;\n\n// From an initializer list (duplicate keys allowed)\nmultimap<char, int> mm2 = {\n    {'a', 1},\n    {'b', 2},\n    {'a', 3}\n};`,
        structure: `<ul><li><strong>Storage:</strong> Balanced binary search tree of key-value pairs</li><li><strong>Element Order:</strong> Elements sorted by key</li><li><strong>Uniqueness:</strong> Keys can be duplicated</li></ul>`,
        functions: `<tr><td>count</td><td>Count elements with specific key</td><td><code>count(key)</code></td></tr><tr><td>equal_range</td><td>Get range of equal elements</td><td><code>equal_range(key)</code></td></tr><tr><td>find</td><td>Find element</td><td><code>find(key)</code></td></tr><tr><td>insert</td><td>Insert elements</td><td><code>insert({key, value})</code></td></tr>`,
        algorithms: `<div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-7 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1"><p>Same as <code>map</code>, but with duplicate key handling. Lacks <code>operator[]</code> and <code>at()</code>.</p></div>`
    },
    {
        id: "unordered-map", title: "Unordered Map", icon: ICONS.unordered,
        declarations: `// Default (empty unordered_map)\nunordered_map<string, int> um1;\n\n// From an initializer list\nunordered_map<string, int> um2 = {\n    {"CPU", 120},\n    {"GPU", 450}\n};\n\n// --- Example with a custom key type ---\n// 1. Define the custom key type\nstruct Point {\n    int x, y;\n};\n\n// 2. Define an equality predicate for the key\nstruct PointEqual {\n    bool operator()(const Point& a, const Point& b) const {\n        return a.x == b.x && a.y == b.y;\n    }\n};\n\n// 3. Define a hash function for the key\nstruct PointHash {\n    size_t operator()(const Point& p) const {\n        size_t h1 = hash<int>()(p.x);\n        size_t h2 = hash<int>()(p.y);\n        return h1 ^ (h2 << 1); // Combine hashes\n    }\n};\n\n// 4. Declare the unordered_map and insert data\nunordered_map<Point, string, PointHash, PointEqual> city_map;\ncity_map.insert({{10, 20}, "New York"});\ncity_map.insert({{30, 40}, "Los Angeles"});`,
        structure: `<ul><li><strong>Storage:</strong> Hash table with separate chaining for key-value pairs</li><li><strong>Element Order:</strong> No guaranteed order</li><li><strong>Access Pattern:</strong> Average O(1)</li><li><strong>Uniqueness:</strong> Keys must be unique</li></ul>`,
        functions: `<tr><td>at</td><td>Access element with bounds checking</td><td><code>at(key)</code></td></tr><tr><td>bucket_count</td><td>Return number of buckets</td><td><code>bucket_count()</code></td></tr><tr><td>count</td><td>Count elements with specific key</td><td><code>count(key)</code></td></tr><tr><td>find</td><td>Find element</td><td><code>find(key)</code></td></tr><tr><td>load_factor</td><td>Return load factor</td><td><code>load_factor()</code></td></tr><tr><td>operator[]</td><td>Access or insert element</td><td><code>um[key]</code></td></tr><tr><td>rehash</td><td>Set number of buckets</td><td><code>rehash(count)</code></td></tr>`,
        algorithms: `<div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-7 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1"><p>Limited algorithm support. Always prefer member functions for performance.</p></div>`
    },
    {
        id: "unordered-multimap", title: "Unordered Multimap", icon: ICONS.unordered,
        declarations: `// Default (empty unordered_multimap)\nunordered_multimap<string, int> umm1;\n\n// From an initializer list (duplicate keys allowed)\nunordered_multimap<string, int> umm2 = {\n    {"course", 101},\n    {"grade", 95},\n    {"course", 202}\n};`,
        structure: `<ul><li><strong>Storage:</strong> Hash table with separate chaining for key-value pairs</li><li><strong>Element Order:</strong> No guaranteed order</li><li><strong>Uniqueness:</strong> Keys can be duplicated</li></ul>`,
        functions: `<tr><td>bucket_count</td><td>Return number of buckets</td><td><code>bucket_count()</code></td></tr><tr><td>count</td><td>Count elements with specific key</td><td><code>count(key)</code></td></tr><tr><td>equal_range</td><td>Get range of equal elements</td><td><code>equal_range(key)</code></td></tr><tr><td>find</td><td>Find element</td><td><code>find(key)</code></td></tr><tr><td>insert</td><td>Insert elements</td><td><code>insert({key, value})</code></td></tr>`,
        algorithms: `<div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-7 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1"><p>Same as <code>unordered_map</code>, but for duplicate keys. Lacks <code>operator[]</code> and <code>at()</code>.</p></div>`
    },
    {
        id: "stack", title: "Stack", icon: ICONS.stack,
        declarations: `// Default stack (uses deque underneath)\nstack<int> s1;\n\n// Stack using a vector as the underlying container\nstack<int, vector<int>> s2;\n\n// Stack using a list as the underlying container\nstack<int, list<int>> s3;`,
        structure: `<ul><li><strong>Storage:</strong> Container adapter (typically uses deque)</li><li><strong>Element Order:</strong> LIFO (Last In, First Out)</li><li><strong>Access Pattern:</strong> Only top element accessible, O(1) operations</li></ul>`,
        functions: `<tr><td>empty</td><td>Test whether stack is empty</td><td><code>empty()</code></td></tr><tr><td>emplace</td><td>Construct and insert element at top</td><td><code>emplace(args...)</code></td></tr><tr><td>pop</td><td>Remove top element</td><td><code>pop()</code></td></tr><tr><td>push</td><td>Insert element at top</td><td><code>push(value)</code></td></tr><tr><td>size</td><td>Return size</td><td><code>size()</code></td></tr><tr><td>top</td><td>Access top element</td><td><code>top()</code></td></tr>`,
        algorithms: `<div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-7 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1"><p>Stack does not provide iterators, so generic STL algorithms cannot be directly applied.</p></div>`
    },
    {
        id: "queue", title: "Queue", icon: ICONS.queue,
        declarations: `// Default queue (uses deque underneath)\nqueue<int> q1;\n\n// Queue using a list as the underlying container\n// (vector cannot be used as it lacks pop_front)\nqueue<int, list<int>> q2;`,
        structure: `<ul><li><strong>Storage:</strong> Container adapter (typically uses deque)</li><li><strong>Element Order:</strong> FIFO (First In, First Out)</li><li><strong>Access Pattern:</strong> Front and back accessible, O(1) operations</li></ul>`,
        functions: `<tr><td>back</td><td>Access last element</td><td><code>back()</code></td></tr><tr><td>empty</td><td>Test whether queue is empty</td><td><code>empty()</code></td></tr><tr><td>emplace</td><td>Construct and insert element at back</td><td><code>emplace(args...)</code></td></tr><tr><td>front</td><td>Access next element</td><td><code>front()</code></td></tr><tr><td>pop</td><td>Remove next element</td><td><code>pop()</code></td></tr><tr><td>push</td><td>Insert element at back</td><td><code>push(value)</code></td></tr>`,
        algorithms: `<div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-7 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1"><p>Queue does not provide iterators, so generic STL algorithms cannot be directly applied.</p></div>`
    },
    {
        id: "priority-queue", title: "Priority Queue", icon: ICONS.priority_queue,
        declarations: `// Max-heap (default, largest element is top)\npriority_queue<int> max_heap;\nmax_heap.push(10);\nmax_heap.push(30);\nmax_heap.push(20); // top is 30\n\n// Min-heap (smallest element is top)\npriority_queue<int, vector<int>, greater<int>> min_heap;\nmin_heap.push(10);\nmin_heap.push(30);\nmin_heap.push(20); // top is 10\n\n// --- Example with a custom type and comparator ---\n// 1. Define the custom type\nstruct Task {\n    int priority;\n    string name;\n};\n\n// 2. Define the comparator (makes a min-heap on priority)\nstruct TaskComparator {\n    bool operator()(const Task& a, const Task& b) const {\n        return a.priority > b.priority;\n    }\n};\n\n// 3. Declare the priority_queue and add tasks\npriority_queue<Task, vector<Task>, TaskComparator> task_queue;\ntask_queue.push({3, "Low priority task"});\ntask_queue.push({1, "High priority task"});\ntask_queue.push({2, "Medium priority task"});\n// After this, task_queue.top().name will be "High priority task"`,
        structure: `<ul><li><strong>Storage:</strong> Container adapter using a heap (typically on a vector)</li><li><strong>Element Order:</strong> Max-heap by default (largest element at top)</li><li><strong>Access Pattern:</strong> Only top element accessible, O(log n) push/pop</li></ul>`,
        functions: `<tr><td>empty</td><td>Test whether priority queue is empty</td><td><code>empty()</code></td></tr><tr><td>emplace</td><td>Construct and insert element</td><td><code>emplace(args...)</code></td></tr><tr><td>pop</td><td>Remove top element</td><td><code>pop()</code></td></tr><tr><td>push</td><td>Insert element</td><td><code>push(value)</code></td></tr><tr><td>top</td><td>Access top element</td><td><code>top()</code></td></tr>`,
        algorithms: `<div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-7 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1"><p>Priority queue does not provide iterators, so generic STL algorithms cannot be directly applied.</p></div>`
    },
    {
        id: "summary", title: "Summary Table", icon: ICONS.summary,
        content: `
            <h2 class="text-3xl md:text-4xl font-bold text-red-500 mb-6 mt-8 pb-3 border-b border-bordercolor flex items-center gap-4">
                <span class="w-8 h-8" dangerouslySetInnerHTML={{ __html: ICONS.summary }}></span>Summary Table: Container Characteristics
            </h2>
            <div class="overflow-x-auto rounded-2xl border border-bordercolor bg-surface shadow-lg">
                <table class="w-full min-w-[600px] border-collapse">
                    <thead>
                        <tr class="bg-bordercolor/50">
                            <th class="text-left p-4 md:p-5 font-semibold text-gray-100 text-sm uppercase tracking-wider">Container</th>
                            <th class="text-left p-4 md:p-5 font-semibold text-gray-100 text-sm uppercase tracking-wider">Internal Structure</th>
                            <th class="text-left p-4 md:p-5 font-semibold text-gray-100 text-sm uppercase tracking-wider">Ordering</th>
                            <th class="text-left p-4 md:p-5 font-semibold text-gray-100 text-sm uppercase tracking-wider">Access Time</th>
                            <th class="text-left p-4 md:p-5 font-semibold text-gray-100 text-sm uppercase tracking-wider">Insert/Delete</th>
                            <th class="text-left p-4 md:p-5 font-semibold text-gray-100 text-sm uppercase tracking-wider">Memory Layout</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-bordercolor">
                        <tr class="hover:bg-red-500/10"><td class="p-4 md:p-5 text-gray-300">vector</td><td class="p-4 md:p-5 text-gray-300">Dynamic array</td><td class="p-4 md:p-5 text-gray-300">Insertion order</td><td class="p-4 md:p-5 text-gray-300">O(1) random</td><td class="p-4 md:p-5 text-gray-300">O(1) back, O(n) middle</td><td class="p-4 md:p-5 text-gray-300">Contiguous</td></tr>
                        <tr class="hover:bg-red-500/10"><td class="p-4 md:p-5 text-gray-300">list</td><td class="p-4 md:p-5 text-gray-300">Doubly-linked list</td><td class="p-4 md:p-5 text-gray-300">Insertion order</td><td class="p-4 md:p-5 text-gray-300">O(n) sequential</td><td class="p-4 md:p-5 text-gray-300">O(1) anywhere</td><td class="p-4 md:p-5 text-gray-300">Non-contiguous</td></tr>
                        <tr class="hover:bg-red-500/10"><td class="p-4 md:p-5 text-gray-300">deque</td><td class="p-4 md:p-5 text-gray-300">Segmented array</td><td class="p-4 md:p-5 text-gray-300">Insertion order</td><td class="p-4 md:p-5 text-gray-300">O(1) random</td><td class="p-4 md:p-5 text-gray-300">O(1) both ends</td><td class="p-4 md:p-5 text-gray-300">Semi-contiguous</td></tr>
                        <tr class="hover:bg-red-500/10"><td class="p-4 md:p-5 text-gray-300">array</td><td class="p-4 md:p-5 text-gray-300">Fixed array</td><td class="p-4 md:p-5 text-gray-300">Assignment order</td><td class="p-4 md:p-5 text-gray-300">O(1) random</td><td class="p-4 md:p-5 text-gray-300">N/A</td><td class="p-4 md:p-5 text-gray-300">Contiguous</td></tr>
                        <tr class="hover:bg-red-500/10"><td class="p-4 md:p-5 text-gray-300">forward_list</td><td class="p-4 md:p-5 text-gray-300">Singly-linked list</td><td class="p-4 md:p-5 text-gray-300">Insertion order</td><td class="p-4 md:p-5 text-gray-300">O(n) sequential</td><td class="p-4 md:p-5 text-gray-300">O(1) after pos</td><td class="p-4 md:p-5 text-gray-300">Non-contiguous</td></tr>
                        <tr class="hover:bg-red-500/10"><td class="p-4 md:p-5 text-gray-300">set/multiset</td><td class="p-4 md:p-5 text-gray-300">Red-Black tree</td><td class="p-4 md:p-5 text-gray-300">Sorted by key</td><td class="p-4 md:p-5 text-gray-300">O(log n)</td><td class="p-4 md:p-5 text-gray-300">O(log n)</td><td class="p-4 md:p-5 text-gray-300">Non-contiguous</td></tr>
                        <tr class="hover:bg-red-500/10"><td class="p-4 md:p-5 text-gray-300">unordered_set</td><td class="p-4 md:p-5 text-gray-300">Hash table</td><td class="p-4 md:p-5 text-gray-300">Hash-based</td><td class="p-4 md:p-5 text-gray-300">O(1) avg</td><td class="p-4 md:p-5 text-gray-300">O(1) avg</td><td class="p-4 md:p-5 text-gray-300">Non-contiguous</td></tr>
                        <tr class="hover:bg-red-500/10"><td class="p-4 md:p-5 text-gray-300">map/multimap</td><td class="p-4 md:p-5 text-gray-300">Red-Black tree</td><td class="p-4 md:p-5 text-gray-300">Sorted by key</td><td class="p-4 md:p-5 text-gray-300">O(log n)</td><td class="p-4 md:p-5 text-gray-300">O(log n)</td><td class="p-4 md:p-5 text-gray-300">Non-contiguous</td></tr>
                        <tr class="hover:bg-red-500/10"><td class="p-4 md:p-5 text-gray-300">unordered_map</td><td class="p-4 md:p-5 text-gray-300">Hash table</td><td class="p-4 md:p-5 text-gray-300">Hash-based</td><td class="p-4 md:p-5 text-gray-300">O(1) avg</td><td class="p-4 md:p-5 text-gray-300">O(1) avg</td><td class="p-4 md:p-5 text-gray-300">Non-contiguous</td></tr>
                        <tr class="hover:bg-red-500/10"><td class="p-4 md:p-5 text-gray-300">stack</td><td class="p-4 md:p-5 text-gray-300">Adapter (deque)</td><td class="p-4 md:p-5 text-gray-300">LIFO</td><td class="p-4 md:p-5 text-gray-300">O(1) top</td><td class="p-4 md:p-5 text-gray-300">O(1) top</td><td class="p-4 md:p-5 text-gray-300">Depends on adapter</td></tr>
                        <tr class="hover:bg-red-500/10"><td class="p-4 md:p-5 text-gray-300">queue</td><td class="p-4 md:p-5 text-gray-300">Adapter (deque)</td><td class="p-4 md:p-5 text-gray-300">FIFO</td><td class="p-4 md:p-5 text-gray-300">O(1) front/back</td><td class="p-4 md:p-5 text-gray-300">O(1) front/back</td><td class="p-4 md:p-5 text-gray-300">Depends on adapter</td></tr>
                        <tr class="hover:bg-red-500/10"><td class="p-4 md:p-5 text-gray-300">priority_queue</td><td class="p-4 md:p-5 text-gray-300">Heap (vector)</td><td class="p-4 md:p-5 text-gray-300">Priority-based</td><td class="p-4 md:p-5 text-gray-300">O(1) top</td><td class="p-4 md:p-5 text-gray-300">O(log n)</td><td class="p-4 md:p-5 text-gray-300">Contiguous</td></tr>
                    </tbody>
                </table>
            </div>`
    },
    {
        id: "quick-ref", title: "Quick Reference", icon: ICONS.quick_ref,
        content: `
            <h2 class="text-3xl md:text-4xl font-bold text-red-500 mb-6 mt-8 pb-3 border-b border-bordercolor flex items-center gap-4">
                <span class="w-8 h-8" dangerouslySetInnerHTML={{ __html: ICONS.quick_ref }}></span>Quick Reference: When to Use Each Container
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-6 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1 flex items-center gap-4"><span class="w-8 h-8" dangerouslySetInnerHTML={{ __html: ICONS.vector }}></span><div><strong class="text-red-500">vector:</strong> Default choice for most scenarios, random access needed.</div></div>
                <div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-6 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1 flex items-center gap-4"><span class="w-8 h-8" dangerouslySetInnerHTML={{ __html: ICONS.list }}></span><div><strong class="text-red-500">list:</strong> Frequent insertion/deletion in middle, no random access needed.</div></div>
                <div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-6 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1 flex items-center gap-4"><span class="w-8 h-8" dangerouslySetInnerHTML={{ __html: ICONS.deque }}></span><div><strong class="text-red-500">deque:</strong> Need efficient front/back operations with random access.</div></div>
                <div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-6 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1 flex items-center gap-4"><span class="w-8 h-8" dangerouslySetInnerHTML={{ __html: ICONS.array }}></span><div><strong class="text-red-500">array:</strong> Fixed size known at compile time, maximum performance.</div></div>
                <div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-6 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1 flex items-center gap-4"><span class="w-8 h-8" dangerouslySetInnerHTML={{ __html: ICONS.forward_list }}></span><div><strong class="text-red-500">forward_list:</strong> Memory-constrained environments, only forward iteration.</div></div>
                <div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-6 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1 flex items-center gap-4"><span class="w-8 h-8" dangerouslySetInnerHTML={{ __html: ICONS.set }}></span><div><strong class="text-red-500">set/multiset:</strong> Need sorted unique/duplicate elements.</div></div>
                <div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-6 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1 flex items-center gap-4"><span class="w-8 h-8" dangerouslySetInnerHTML={{ __html: ICONS.unordered }}></span><div><strong class="text-red-500">unordered_set:</strong> Fast lookup of unique elements, no ordering needed.</div></div>
                <div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-6 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1 flex items-center gap-4"><span class="w-8 h-8" dangerouslySetInnerHTML={{ __html: ICONS.map }}></span><div><strong class="text-red-500">map/multimap:</strong> Key-value pairs with sorted keys.</div></div>
                <div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-6 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1 flex items-center gap-4"><span class="w-8 h-8" dangerouslySetInnerHTML={{ __html: ICONS.unordered }}></span><div><strong class="text-red-500">unordered_map:</strong> Fast key-value lookup, no key ordering needed.</div></div>
                <div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-6 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1 flex items-center gap-4"><span class="w-8 h-8" dangerouslySetInnerHTML={{ __html: ICONS.stack }}></span><div><strong class="text-red-500">stack:</strong> LIFO operations (e.g., function calls).</div></div>
                <div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-6 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1 flex items-center gap-4"><span class="w-8 h-8" dangerouslySetInnerHTML={{ __html: ICONS.queue }}></span><div><strong class="text-red-500">queue:</strong> FIFO operations (e.g., task scheduling).</div></div>
                <div class="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-6 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1 flex items-center gap-4"><span class="w-8 h-8" dangerouslySetInnerHTML={{ __html: ICONS.priority_queue }}></span><div><strong class="text-red-500">priority_queue:</strong> Process elements by priority.</div></div>
            </div>`
    }
];

// Helper function to render styled code
const StyledCodeBlock = ({ code }) => {
    // Basic syntax highlighting for the demo
    const highlightedCode = code
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\/\/(.*)/g, '<span class="text-gray-500">//$1</span>') // Comments
        .replace(/(vector|string|list|deque|array|set|map|int|double|char|struct|bool|size_t)/g, '<span class="text-red-500">$1</span>') // Keywords
        .replace(/(\"[\w\s-]+\")/g, '<span class="text-green-400">$1</span>') // Strings
        .replace(/({|}|;|\[|\]|\(|\))/g, '<span class="text-gray-400">$1</span>'); // Punctuation

    return (
        <pre className="font-mono text-sm text-gray-300 bg-black rounded-lg p-6 overflow-x-auto border border-bordercolor focus:outline-none focus:border-red-500 focus:shadow-glow-red-sm transition-all duration-300" tabIndex="0">
            <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </pre>
    );
};

// Main Component
export default function StlGuide() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [activeSection, setActiveSection] = useState('overview');
    const [isMobile, setIsMobile] = useState(false);

    const sidebarRef = useRef(null);
    const searchRef = useRef(null);
    const sectionRefs = useRef({});

    // --- Logic from original script ---

    // 1. Handle Mobile Responsive State
    useLayoutEffect(() => {
        const checkIsMobile = () => window.innerWidth <= 1024;
        
        const handleResize = () => {
            const mobile = checkIsMobile();
            setIsMobile(mobile);
            // Original logic: set initial layout state on resize
            if (mobile) {
                setIsSidebarOpen(false);
                setIsSearchOpen(false);
            } else {
                setIsSidebarOpen(true);
                setIsSearchOpen(true);
            }
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 2. Handle Fullscreen Toggle
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const onFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);

    // 3. Handle Click-Away
    useEffect(() => {
        const handleClickAway = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setFilteredResults([]); // Close search results
            }
            if (isMobile && sidebarRef.current && !sidebarRef.current.contains(event.target) && event.target.id !== 'menuToggle') {
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickAway);
        return () => document.removeEventListener('mousedown', handleClickAway);
    }, [isMobile]);

    // 4. Handle Search
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase().trim();
        setSearchQuery(query);
        if (query) {
            const filtered = pageData.filter(item => item.title.toLowerCase().includes(query));
            setFilteredResults(filtered);
        } else {
            setFilteredResults([]);
        }
    };
    
    const handleResultClick = () => {
        setSearchQuery('');
        setFilteredResults([]);
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    // 5. Handle Intersection Observer for Active Nav
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0.1 }
        );

        const currentRefs = sectionRefs.current;
        Object.values(currentRefs).forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => {
            Object.values(currentRefs).forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, [pageData]); // Rerun if pageData changes

    // --- Render Component ---

    return (
        <div className="relative min-h-screen bg-black text-gray-200 font-sans">
            
            {/* --- Buttons (Styled as per Nothing OS theme) --- */}
            <button
                id="menuToggle"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="fixed z-[1001] top-5 left-5 w-12 h-12 rounded-full flex items-center justify-center border border-red-500 text-red-500 bg-black/80 backdrop-blur-md hover:bg-red-500 hover:text-black hover:shadow-glow-red-xl transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-90"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>

            <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="fixed z-[1001] top-5 right-5 w-12 h-12 rounded-full flex items-center justify-center border border-red-500 text-red-500 bg-black/80 backdrop-blur-md hover:bg-red-500 hover:text-black hover:shadow-glow-red-xl transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-90"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>

            <button
                onClick={toggleFullscreen}
                className="fixed z-[1001] bottom-5 right-5 w-12 h-12 rounded-full flex items-center justify-center border border-red-500 text-red-500 bg-black/80 backdrop-blur-md hover:bg-red-500 hover:text-black hover:shadow-glow-red-xl transition-all duration-300 ease-in-out hover:scale-110"
            >
                {isFullscreen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                )}
            </button>

            {/* --- Sidebar --- */}
            <aside
                ref={sidebarRef}
                className={`w-72 bg-surface h-screen fixed top-0 left-0 border-r border-bordercolor overflow-y-auto z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-6 text-2xl font-bold text-red-500 text-center font-mono tracking-wider border-b border-bordercolor">
                    C++ STL Guide
                </div>
                <nav onClick={isMobile ? () => setIsSidebarOpen(false) : undefined}>
                    <ul className="py-4">
                        {pageData.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <li key={item.id}>
                                    <a
                                        href={item.isExternal ? item.href : `#${item.id}`}
                                        className={`flex items-center text-base p-3 px-6 mx-2 my-1 rounded-lg font-medium transition-all duration-300 ease-in-out group
                                            ${isActive
                                                ? 'bg-surface border border-red-500 text-red-500 shadow-glow-red-md'
                                                : 'text-gray-300 hover:text-red-500 hover:shadow-glow-red-md hover:-translate-y-1 hover:bg-surface'
                                            }`}
                                    >
                                        <span
                                            className="icon-container mr-3 w-6 h-6"
                                            dangerouslySetInnerHTML={{ __html: item.icon }}
                                        />
                                        <span>{item.title}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>

            {/* --- Main Content --- */}
            <main className={`relative min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-72' : 'ml-0'}`}>
                
                {/* Search Container */}
                <div
                    ref={searchRef}
                    className={`sticky top-0 z-40 bg-black/80 backdrop-blur-md pt-6 pb-4 transition-all duration-300 ${isSearchOpen ? 'opacity-100' : 'opacity-0 h-0 p-0 m-0 overflow-hidden'}`}
                >
                    <div className="relative max-w-7xl mx-auto px-6 md:px-10">
                        <span className="absolute top-1/2 left-11 md:left-15 -translate-y-1/2 w-6 h-6 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </span>
                        <input
                            type="text"
                            id="searchBar"
                            placeholder="Search for a container or algorithm..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full bg-surface border border-bordercolor text-gray-100 text-lg rounded-xl px-5 py-4 pl-14 font-mono focus:outline-none focus:border-red-500 focus:shadow-glow-red-md transition-all duration-300"
                        />
                        {/* Search Results */}
                        {filteredResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 mx-6 md:mx-10 bg-surface border border-bordercolor rounded-xl shadow-2xl max-h-80 overflow-y-auto z-50">
                                {filteredResults.map(item => (
                                    <a
                                        key={item.id}
                                        href={item.isExternal ? item.href : `#${item.id}`}
                                        onClick={handleResultClick}
                                        className="block p-4 text-gray-300 hover:text-red-500 hover:bg-red-500/10 transition-colors duration-200 cursor-pointer"
                                    >
                                        {item.title}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* --- Content Sections (Dynamic) --- */}
                <div className="p-6 md:p-10">
                    
                    {/* Overview Section */}
                    <section
                        id="overview"
                        ref={el => (sectionRefs.current['overview'] = el)}
                        className="content-section pt-10 mb-12 max-w-7xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide flex items-center gap-4">
                            <span className="w-10 h-10" dangerouslySetInnerHTML={{ __html: ICONS.overview }}></span>
                            Complete C++ STL Guide
                        </h1>
                        <div className="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-7 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1">
                            <p className="text-lg text-gray-300">This comprehensive guide covers all major STL containers, their internal structure, member functions, and applicable algorithms. Each container section includes details on how elements are stored and organized internally, providing a deep dive into their performance characteristics and use cases.</p>
                        </div>
                    </section>

                    {/* All Other Sections */}
                    {pageData.map(item => {
                        if (item.id === 'overview' || item.isExternal) return null;

                        if (item.content) {
                            // For "Summary" and "Quick Ref"
                            return (
                                <section
                                    key={item.id}
                                    id={item.id}
                                    ref={el => (sectionRefs.current[item.id] = el)}
                                    className="content-section pt-10 mb-12 max-w-7xl mx-auto"
                                    dangerouslySetInnerHTML={{ __html: item.content }}
                                />
                            );
                        }
                        
                        // For all other container/algorithm sections
                        return (
                            <section
                                key={item.id}
                                id={item.id}
                                ref={el => (sectionRefs.current[item.id] = el)}
                                className="content-section pt-10 mb-12 max-w-7xl mx-auto"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-6 mt-8 pb-3 border-b border-bordercolor flex items-center gap-4">
                                    <span className="w-8 h-8" dangerouslySetInnerHTML={{ __html: item.icon }}></span>
                                    {item.title}
                                </h2>

                                {item.declarations && (
                                    <>
                                        {(item.id.startsWith("unordered") || item.id === "priority-queue") && (
                                            <div className="relative bg-red-500/5 border-l-4 border-red-500 rounded-r-lg p-6 my-6 text-gray-300 pr-12">
                                                <span className="absolute top-6 right-6 text-xl">💡</span>
                                                <p><strong>Note:</strong> For custom types, ensure you've included necessary headers like <code>&lt;string&gt;</code> and defined the hash/equality/comparator structs before declaring the container.</p>
                                            </div>
                                        )}
                                        <h3 className="text-xl md:text-2xl font-semibold text-gray-100 mb-4 mt-8 flex items-center gap-3 border-l-4 border-red-500 pl-4">
                                            <span className="w-6 h-6" dangerouslySetInnerHTML={{ __html: ICONS.info }}></span>
                                            Declaration & Initialization
                                        </h3>
                                        <div className="bg-surface border border-bordercolor rounded-2xl overflow-hidden shadow-xl my-6">
                                            <div className="bg-bordercolor/50 px-6 py-4 text-gray-100 font-medium font-mono tracking-wide flex items-center gap-3">
                                                <span className="w-5 h-5" dangerouslySetInnerHTML={{ __html: ICONS.quick_ref }}></span>
                                                Code Examples
                                            </div>
                                            <div className="p-0">
                                                <StyledCodeBlock code={item.declarations} />
                                            </div>
                                        </div>
                                    </>
                                )}
                                
                                {item.structure && (
                                    <>
                                        <h3 className="text-xl md:text-2xl font-semibold text-gray-100 mb-4 mt-8 flex items-center gap-3 border-l-4 border-red-500 pl-4">
                                            <span className="w-6 h-6" dangerouslySetInnerHTML={{ __html: ICONS.array }}></span>
                                            Internal Structure & Organization
                                        </h3>
                                        <div 
                                            className="styled-list bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-7 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1"
                                            dangerouslySetInnerHTML={{ __html: item.structure }}
                                        />
                                    </>
                                )}

                                {item.functions && (
                                    <>
                                        <h3 className="text-xl md:text-2xl font-semibold text-gray-100 mb-4 mt-8 flex items-center gap-3 border-l-4 border-red-500 pl-4">
                                            <span className="w-6 h-6" dangerouslySetInnerHTML={{ __html: ICONS.algorithms }}></span>
                                            Member Functions
                                        </h3>
                                        <div className="overflow-x-auto rounded-2xl border border-bordercolor bg-surface shadow-lg">
                                            <table className="w-full min-w-[600px] border-collapse">
                                                <thead>
                                                    <tr className="bg-bordercolor/50">
                                                        <th className="text-left p-4 md:p-5 font-semibold text-gray-100 text-sm uppercase tracking-wider">Function</th>
                                                        <th className="text-left p-4 md:p-5 font-semibold text-gray-100 text-sm uppercase tracking-wider">Description</th>
                                                        <th className="text-left p-4 md:p-5 font-semibold text-gray-100 text-sm uppercase tracking-wider">Syntax</th>
                                                    </tr>
                                                </thead>
                                                <tbody 
                                                    className="divide-y divide-bordercolor"
                                                    dangerouslySetInnerHTML={{ __html: item.functions }}
                                                />
                                            </table>
                                        </div>
                                    </>
                                )}

                                {item.algorithms && (
                                    <>
                                        <h3 className="text-xl md:text-2xl font-semibold text-gray-100 mb-4 mt-8 flex items-center gap-3 border-l-4 border-red-500 pl-4">
                                            <span className="w-6 h-6" dangerouslySetInnerHTML={{ __html: ICONS.quick_ref }}></span>
                                            STL Algorithms
                                        </h3>
                                        {Array.isArray(item.algorithms) ? (
                                            <>
                                                <div className="relative bg-red-500/5 border-l-4 border-red-500 rounded-r-lg p-6 my-6 text-gray-300 pr-12">
                                                    <span className="absolute top-6 right-6 text-xl">💡</span>
                                                    <p><strong>Note:</strong> All algorithm examples assume you have included the <code>&lt;algorithm&gt;</code> header (and <code>&lt;numeric&gt;</code> for algorithms like <code>accumulate</code> and <code>iota</code>).</p>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {item.algorithms.map(algo => (
                                                        <div key={algo.name} className="bg-surface/80 backdrop-blur-md border border-bordercolor rounded-2xl p-6 shadow-lg transition-all duration-500 ease-in-out hover:shadow-glow-red-lg hover:-translate-y-1">
                                                            <h4 className="text-lg font-semibold text-red-500 mb-2 flex items-center gap-3">
                                                                <span className="w-6 h-6" dangerouslySetInnerHTML={{ __html: algo.icon }}></span>
                                                                {algo.name}
                                                            </h4>
                                                            <p className="text-gray-400 text-sm" dangerouslySetInnerHTML={{ __html: algo.description }} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div dangerouslySetInnerHTML={{ __html: item.algorithms }} />
                                        )}
                                    </>
                                )}
                            </section>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}