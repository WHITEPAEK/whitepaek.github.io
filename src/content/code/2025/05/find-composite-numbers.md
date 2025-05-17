---
isDraft: false
title: 합성수 찾기
pubDate: 2025-05-17
---

## 문제 설명

약수의 개수가 세 개 이상인 수를 합성수라고 합니다. 자연수 n이 매개변수로 주어질 때 n 이하의 합성수의 개수를 return 하도록 solution 함수를 완성해주세요.

- 10 이하 합성수는 4, 6, 8, 9, 10 로 5개입니다. 따라서 5를 return 합니다.
- 15 이하 합성수는 4, 6, 8, 9, 10, 12, 14, 15 로 8개입니다. 따라서 8을 return 합니다.

## 제한사항

- 1 ≤ n ≤ 100

## 솔루션 코드

#### Review Code
- 시간복잡도: O(n²)
```java
class Solution {
    public int solution(int n) {
        int count = 0;

        for (int i = 1; i <= n; i++) {
            int divisorCount = 0;

            for (int j = 1; j <= i; j++) {
                if (i % j == 0) {
                    divisorCount++;
                }
            }

            if (divisorCount >= 3) {
                count++;
            }
        }

        return count;
    }
}
```
