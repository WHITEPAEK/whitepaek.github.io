---
isDraft: false
title: k의 개수
pubDate: 2025-05-17
---

## 문제 설명

1부터 13까지의 수에서, 1은 1, 10, 11, 12, 13 이렇게 총 6번 등장합니다. 정수 i, j, k가 매개변수로 주어질 때, i부터 j까지 k가 몇 번 등장하는지 return 하도록 solution 함수를 완성해주세요.

- 10부터 50까지 5는 15, 25, 35, 45, 50 총 5번 등장합니다. 따라서 5를 return 합니다.
- 3부터 10까지 2는 한 번도 등장하지 않으므로 0을 return 합니다.

## 제한사항

- 1 ≤ i < j ≤ 100,000
- 0 ≤ k ≤ 9

## 솔루션 코드

#### Challenge Code
- 시간복잡도: O(n × d)
```java
class Solution {
    public int solution(int i, int j, int k) {
        StringBuilder sb = new StringBuilder();
        
        while(i <= j) {
            sb.append(String.valueOf(i));
            i++;
        }
        
        return (int) sb.toString().chars()
            .filter(ch -> ch == (char) (k + '0'))
            .count();
    }
}
```

#### Review Code
- 시간복잡도: O(n × d)
```java
class Solution {
    public int solution(int i, int j, int k) {
        int count = 0;

        for (int n = i; n <= j; n++) {
            int num = n;
            while (num > 0) {
                if (num % 10 == k) count++;
                num /= 10;
            }
        }

        return count;
    }
}
```
