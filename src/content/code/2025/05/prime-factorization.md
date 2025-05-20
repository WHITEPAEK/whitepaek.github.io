---
isDraft: false
title: 소인수분해
pubDate: 2025-05-18
---

## 문제 설명

소인수분해란 어떤 수를 소수들의 곱으로 표현하는 것입니다.
예를 들어 12를 소인수 분해하면 2 * 2 * 3 으로 나타낼 수 있습니다.
따라서 12의 소인수는 2와 3입니다.
자연수 n이 매개변수로 주어질 때 n의 소인수를 오름차순으로 담은 배열을 return 하도록 solution 함수를 완성해주세요.

- 12를 소인수분해하면 2 * 2 * 3 입니다. 따라서 [2, 3]을 return 합니다.
- 17은 소수입니다. 따라서 [17]을 return 해야 합니다.
- 420을 소인수분해하면 2 * 2 * 3 * 5 * 7 입니다. 따라서 [2, 3, 5, 7]을 return 합니다.

## 제한사항

- 2 ≤ n ≤ 10,000

## 솔루션 코드

#### Review Code
- 시간복잡도: O(√n)
```java
import java.util.*;

class Solution {
    public int[] solution(int n) {
        Set<Integer> set = new LinkedHashSet<>();

        for (int i = 2; i <= n; i++) {
            while (n % i == 0) {
                set.add(i);
                n /= i;
            }
        }

        int[] answer = new int[set.size()];
        int idx = 0;
        for (int num : set) {
            answer[idx++] = num;
        }

        return answer;
    }
}

```
