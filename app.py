import sys
import heapq
import json

def dijkstra(graph, start, end):
    queue = [(0, start)]
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    shortest_path = {node: None for node in graph}

    while queue:
        current_distance, current_node = heapq.heappop(queue)

        if current_distance > distances[current_node]:
            continue

        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight

            if distance < distances[neighbor]:
                distances[neighbor] = distance
                shortest_path[neighbor] = current_node
                heapq.heappush(queue, (distance, neighbor))

    path, node = [], end
    while shortest_path[node] is not None:
        path.append(node)
        node = shortest_path[node]
    if path:
        path.append(start)
    path.reverse()

    return path, distances[end]

if _name_ == "_main_":
    start = sys.argv[1]
    end = sys.argv[2]
    graph = json.loads(sys.argv[3])  # Passing graph as JSON string

    path, total_distance = dijkstra(graph, start, end)
    output = {
        'path': path,
        'total_distance': total_distance
    }
    print(json.dumps(output))