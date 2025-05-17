---
isDraft: false
title: 약수 구하기
pubDate: 2025-05-16
---

## 문제 설명

정수 n이 매개변수로 주어질 때, n의 약수를 오름차순으로 담은 배열을 return 하도록 solution 함수를 완성해주세요.

- 24의 약수를 오름차순으로 담은 배열 [1, 2, 3, 4, 6, 8, 12, 24]를 return 합니다.
- 29의 약수를 오름차순으로 담은 배열 [1, 29]를 return 합니다.

## 제한사항

- 1 ≤ n ≤ 10,000

## 솔루션 코드

#### Challenge Code
- 시간복잡도: O(n)
```java
import java.util.*;

class Solution {
    public int[] solution(int n) {
        ArrayList<Integer> numList = new ArrayList<>();
        
        for (int i = 1; i <= n; i++) {
            if (n % i == 0) {
                numList.add(i);
            }
        }
        
        return numList.stream()
            .mapToInt(Integer::intValue)
            .toArray();
    }
}
```

#### Review Code
- 시간복잡도: O(√n)
```java
import java.util.*;

class Solution {
    public int[] solution(int n) {
        Set<Integer> divisors = new TreeSet<>();

        for (int i = 1; i * i <= n; i++) {
            if (n % i == 0) {
                divisors.add(i);
                divisors.add(n / i);
            }
        }

        return divisors.stream()
            .mapToInt(Integer::intValue)
            .toArray();
    }
}
```
