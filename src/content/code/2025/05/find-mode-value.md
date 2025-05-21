---
isDraft: false
title: 최빈값 구하기
pubDate: 2025-05-21
---

## 문제 설명

최빈값은 주어진 값 중에서 가장 자주 나오는 값을 의미합니다.
정수 배열 array가 매개변수로 주어질 때, 최빈값을 return 하도록 solution 함수를 완성해보세요. 최빈값이 여러 개면 -1을 return 합니다.

- [1, 2, 3, 3, 3, 4]에서 1은 1개 2는 1개 3은 3개 4는 1개로 최빈값은 3입니다.
- [1, 1, 2, 2]에서 1은 2개 2는 2개로 최빈값이 1, 2입니다. 최빈값이 여러 개이므로 -1을 return 합니다.
- [1]에는 1만 있으므로 최빈값은 1입니다.

## 제한사항

- 0 < array의 길이 < 100
- 0 ≤ array의 원소 < 1000

## 솔루션 코드

#### Review Code
- 시간복잡도: O(n)
```java
import java.util.*;

class Solution {
    public int solution(int[] array) {
        int answer = -1;
        int maxCount = 0;
        
        Map<Integer, Integer> countMap = new HashMap<>();
        
        for (int num : array) {
            int count = countMap.getOrDefault(num, 0) + 1;
            
            if (count > maxCount) {
                maxCount = count;
                answer = num;
            } else if (count == maxCount) {
                answer = -1;
            }
            
            countMap.put(num, count);
        }
        
        return answer;
    }
}
```
