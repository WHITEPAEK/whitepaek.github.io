---
isDraft: false
title: 배열 뒤집기
pubDate: 2025-05-15
---

## 문제 설명

정수가 들어 있는 배열 num_list가 매개변수로 주어집니다. num_list의 원소의 순서를 거꾸로 뒤집은 배열을 return 하도록 solution 함수를 완성해주세요.

- num_list가 [1, 2, 3, 4, 5]이므로 순서를 거꾸로 뒤집은 배열 [5, 4, 3, 2, 1]을 return 합니다.
- num_list가 [1, 1, 1, 1, 1, 2]이므로 순서를 거꾸로 뒤집은 배열 [2, 1, 1, 1, 1, 1]을 return 합니다.
- num_list가 [1, 0, 1, 1, 1, 3, 5]이므로 순서를 거꾸로 뒤집은 배열 [5, 3, 1, 1, 1, 0, 1]을 return 합니다.

## 제한사항

- 1 ≤ num_list의 길이 ≤ 1,000
- 0 ≤ num_list의 원소 ≤ 1,000

## 솔루션 코드

#### Review Code
- 시간복잡도: O(n)
```java
class Solution {
    public int[] solution(int[] num_list) {
        int size = num_list.length;
        int[] answer = new int[size];
        
        for (int i = 0; i < size; i++) {
            int point = (size - 1) - i;
            answer[i] = num_list[point];
        }
        
        return answer;
    }
}
```
