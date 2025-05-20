---
isDraft: false
title: 특이한 정렬
pubDate: 2025-05-20
---

## 문제 설명

정수 n을 기준으로 n과 가까운 수부터 정렬하려고 합니다. 이때 n으로부터의 거리가 같다면 더 큰 수를 앞에 오도록 배치합니다.
정수가 담긴 배열 numlist와 정수 n이 주어질 때 numlist의 원소를 n으로부터 가까운 순서대로 정렬한 배열을 return 하도록 solution 함수를 완성해주세요.

## 제한사항

- 1 ≤ n ≤ 10,000
- 1 ≤ numlist의 원소 ≤ 10,000
- 1 ≤ numlist의 길이 ≤ 100
- numlist는 중복된 원소를 갖지 않습니다.

## 솔루션 코드

#### Review Code
- 시간복잡도: O(n log n)
```java
import java.util.*;

class Solution {
    public int[] solution(int[] numlist, int n) {
        Integer[] arr = Arrays.stream(numlist).boxed().toArray(Integer[]::new);

        Arrays.sort(arr, (a, b) -> {
            int distA = Math.abs(a - n);
            int distB = Math.abs(b - n);
            if (distA != distB) {
                return distA - distB;
            } else {
                return b - a;
            }
        });

        return Arrays.stream(arr).mapToInt(Integer::intValue).toArray();
    }
}
```
